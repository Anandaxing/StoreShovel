import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { Query, ID } from "node-appwrite";
import { parseStringify } from "../utils";
import { createServerFn } from "@tanstack/react-start";

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

const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient()

  try {
    const session = await account.createEmailToken(ID.unique(), email)
    return session.userId
  } catch (error) {
    handleError(error, "Failed to send email OTP")
  }
}

export const createAccount = createServerFn()
  .validator(
    (data: accountInterface) => data
  ).handler(async ({ data }) => {
  const { fullName, email } = data;
  const existingUser = await getUserByEmail(email)
  const accountId = await sendEmailOTP({ email })
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