import { Client, Databases, Query} from "appwrite";
import conf from "../conf/conf"

// Services to interact with the Appwrite Database
// Provides Read, Write, Update and delete services for the blogs in our database
class DBService {

    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async uploadBlog({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Database :: uploadBlog :: error", error);
        }
    }

    async updateBlog(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Database :: updateBlog :: error", error);
        }
    }

    async deleteBlog(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Database :: deleteBlog :: error", error);
            return false;
        }
    }

    async getBlog(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Database :: getBlog :: error", error);
            return false;
        }
    }

    async getBlogs(queries = [Query.equal("status", ["active"])]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite Database :: getBlogs :: error", error);
            return false
        }
    }

}

const dbService = new DBService();

export default dbService;