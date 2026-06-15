import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DataBaseService {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featureImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.error("Create Post Error:", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featureImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                }
            );
        } catch (error) {
            console.error("Update Post Error:", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );

            return true;
        } catch (error) {
            console.error("Delete Post Error:", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Get Post Error:", error);
            return null;
        }
    }

    async getPosts(query = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                query
            );
        } catch (error) {
            console.error("Get Posts Error:", error);
            return null;
        }
    }

    // Storage Services

    async uploadImage(image) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                image
            );
        } catch (error) {
            console.error("Upload Image Error:", error);
            throw error;
        }
    }

    async deleteImage(imageId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                imageId
            );

            return true;
        } catch (error) {
            console.error("Delete Image Error:", error);
            return false;
        }
    }

    getImagePreviewURL(imageId) {
        return this.storage.getFileView(
            config.appwriteBucketId,
            imageId
        ).toString();  // ✅ convert to string
    }
}

const databaseService = new DataBaseService();

export default databaseService;