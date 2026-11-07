import { Client } from "node-appwrite"
import { appwriteConfig } from "./config"
import { getCookie } from "@tanstack/react-start/server"
import { Account, Databases, Avatars, Storage } from "node-appwrite"

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
  const session = getCookie('appwrite-session')
  if (!session) throw new Error("No session")
  client.setSession(session)
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client)
    }
  }
}

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey)
  return {
    get account() {
      return new Account(client)
    },
    get databases() {
      return new Databases(client)
    },
    get storage() {
      return new Storage(client)
    },
    get avatars() {
      return new Avatar(client)
    }
  }
}