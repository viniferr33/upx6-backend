import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import IDatabaseNoSQL from "../../../interfaces/IDatabaseNoSQL";
import {
  CollectionRef,
  Filter,
  DocumentRef,
} from "../../../interfaces/IDatabaseNoSQL";
import { Entity } from "../../../interfaces/types";

export default class Firebase implements IDatabaseNoSQL {
  private service;

  constructor() {
    const application = initializeApp(
      { credential: credential.cert(require("./serviceAccountKey.json")) },
      "Firebase"
    );

    this.service = getFirestore(application);
  }

  createCollection(path: String): Promise<CollectionRef> {
    return new Promise(async (resolve, reject) => {
      try {
        //all collection within this project must have an header document
        const pathSplitted = path.split("/");
        const header = {
          id: pathSplitted[0],
          colRef: path,
        };

        //exists ?
        const collectionExists = await this.collectionExists(path);
        if (collectionExists)
          throw new Error("Cant create! Collection already exists!");

        await this.service.doc(path + "/header").set(header);
        resolve(header);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteCollection(path: string): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const allDocuments = await this.listDocuments(path);
        await this.deleteDocumentBatch(
          allDocuments.map((doc) => String(doc.id))
        );

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Return MAP <CollectionId, Success || Failure>
  deleteCollectionBatch(path: String): Promise<Map<String, Boolean>> {
    return new Promise((resolve, reject) => {});
  }

  listCollections(
    path: string,
    filter?: Array<Filter>
  ): Promise<Array<CollectionRef>> {
    return new Promise(async (resolve, reject) => {
      try {
        const collectionSnap = await this.service.doc(path).listCollections();
        const collections: Array<CollectionRef> = [];
        collectionSnap.forEach((collection) => {
          collections.push({
            id: collection.id,
            colRef: path + "/" + collection.id,
          });
        });

        if (filter) {
        }

        resolve(collections);
      } catch (error) {
        reject(error);
      }
    });
  }

  getCollection(path: string): Promise<CollectionRef> {
    return new Promise(async (resolve, reject) => {
      try {
        const collectionSnap = await this.service.collection(path).get();
        resolve({
          id: String(path.split("/").pop()),
          colRef: path,
          documents: collectionSnap.docs.map((docId) => String(docId)),
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getAllDocumentsFromCollection(
    path: string,
    filter?: Array<Filter>
  ): Promise<Array<DocumentRef>> {
    return new Promise(async (resolve, reject) => {
      try {
        const collectionSnap = await this.service.collection(path).get();
        const allDocuments: Array<DocumentRef> = [];

        collectionSnap.forEach((doc) =>
          allDocuments.push({
            id: doc.id,
            docRef: path + "/" + doc.id,
            data: doc.data(),
          })
        );
        resolve(allDocuments);
      } catch (error) {
        reject(error);
      }
    });
  }

  collectionExists(path: String): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(this.documentExists(path + "/header"));
      } catch (error) {
        reject(error);
      }
    });
  }

  createDocument(path: string, data: Entity): Promise<DocumentRef> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.service.doc(path).set(data);
        resolve({
          id: String(path.split("/").pop()),
          docRef: path,
          data: data,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Return MAP <DocumentId, Success || Failure
  createDocumentBatch(
    documents: Map<String, Entity>
  ): Promise<Array<DocumentRef>> {
    return new Promise((resolve, reject) => {});
  }

  updateDocument(path: String, data: Entity): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error) {
        reject(error);
      }
    });
  }

  // Return MAP <DocumentId, Success || Failure
  updateDocumentBatch(
    documents: Map<String, Entity>
  ): Promise<Map<String, Boolean>> {
    return new Promise((resolve, reject) => {});
  }

  listDocuments(
    path: string,
    filter?: Array<Filter>
  ): Promise<Array<DocumentRef>> {
    return new Promise(async (resolve, reject) => {
      try {
        const documentSnap = await this.service.collection(path).get();
        const finalResult: Array<DocumentRef> = [];
        documentSnap.forEach((doc) => {
          finalResult.push({
            id: doc.id,
            docRef: path + "/" + doc.id,
            data: doc.data(),
          });
        });

        if (filter) {
          // TO DO: IMPLEMENT FILTERING
        }

        resolve(finalResult);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteDocument(path: string): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.service.doc(path).delete();
        const exists = this.documentExists(path);
        resolve(!exists);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteDocumentBatch(documents: Array<string>): Promise<Map<String, Boolean>> {
    return new Promise(async (resolve, reject) => {
      try {
        const writeResults = new Map<string, Boolean>();

        const batchExecutor = this.service.batch();
        documents.forEach((docPath) => {
          const docRef = this.service.doc(docPath);
          batchExecutor.delete(docRef);
          writeResults.set(docPath, true);
        });

        await batchExecutor.commit();
        resolve(writeResults);
      } catch (error) {
        reject(error);
      }
    });
  }

  getDocument(path: string): Promise<DocumentRef> {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = await this.service.doc(path).get();
        resolve({
          id: docRef.id,
          docRef: path,
          data: docRef.data(),
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  documentExists(path: string): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = await this.service.doc(path).get();
        resolve(docRef.exists);
      } catch (error) {
        reject(error);
      }
    });
  }
}
