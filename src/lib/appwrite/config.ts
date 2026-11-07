export const appwriteConfig = {
  endpointUrl: process.env.APPWRITE_ENDPOINT!,
  projectId: process.env.APPWRITE_PROJECT_ID!,
  databaseId: process.env.APPWRITE_DATABASE_ID!,
  usersCollectionId: process.env.APPWRITE_USERS_COLLECTION!,
  filesCollectionId: process.env.APPWRITE_FILES_COLLECTION!,
  bucketId: process.env.APPWRITE_BUCKET!,
  secretKey: process.env.APPWRITE_API_KEY!,
}