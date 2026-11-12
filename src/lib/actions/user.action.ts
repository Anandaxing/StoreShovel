import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { Query, ID } from "node-appwrite";
import { parseStringify } from "../utils";
import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";

type accountInterface = {
  fullName: string,
  email: string,
}

const handleError = (error: unknown, message: string) => { 
  console.log(error, message)
  throw error
}

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId, 
    [Query.equal("email", [email])]
  )

  return result.total > 0 ? result.documents[0] : null
}

export const sendEmailOTP = createServerFn()
  .validator((email: string) => email).handler(async ({ data }) => {
    const { account } = await createAdminClient()
  
    try {
      const session = await account.createEmailToken(ID.unique(), data)
      return session.userId
    } catch (error) {
      handleError(error, "Failed to send email OTP")
    }
  })

export const createAccount = createServerFn()
  .validator(
    (data: accountInterface) => data
  ).handler(async ({ data }) => {
  const { fullName, email } = data;
  const existingUser = await getUserByEmail(email)
    const accountId = await sendEmailOTP({ data: email })
  if (!accountId) throw new Error("Failed to send an OTP")
  if (!existingUser) {
    const { databases } = await createAdminClient()
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(), 
      {
        fullName,
        email,
        avatar: 'https://dentistry.co.uk/app/uploads/2025/08/AdobeStock_805282248-scaled.jpeg',
        account_id: accountId
      }
    )
  }

  return parseStringify({ accountId })
  })

export const verifySecret = createServerFn().validator(
  (data: {
    accountId: string,
    password: string
  }) => data).handler(async ({ data }) => {
    const { accountId, password } = data
    try {
      const { account } = await createAdminClient()
      const session = await account.createSession(accountId, password)

      setCookie("appwrite-session", session.secret, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: true,
      })

      return parseStringify({sessionId: session.$id})
      
    } catch (error) {
      handleError(error, "Failed to verify OTP")
    } 
  })
