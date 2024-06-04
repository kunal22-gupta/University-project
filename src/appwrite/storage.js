import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

// Services to interact with Appwrite Storage.
class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Storage :: uploadFile :: error", error);
            return false;

        }
    }
    
    async deleteFile(fileID) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileID,
            )
            return true;
        } catch (error) {
            console.log("Appwrite Storage :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileID) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
    }
}

const storageService = new StorageService();

export default storageService;