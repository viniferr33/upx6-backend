import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import {
  CollectionRef,
  Filter,
  DocumentRef,
} from "../../interfaces/IDatabaseNoSQL";
import { Entity } from "../../interfaces/types";

export default class Firebase implements IDatabaseNoSQL {
  private service;

  constructor() {
    const application = initializeApp(
      { credential: applicationDefault() },
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

  deleteCollection(path: String): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
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
    path: String,
    filter?: Array<Filter>
  ): Promise<Array<CollectionRef>> {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error) {
        reject(error);
      }
    });
  }

  getCollection(path: String): Promise<CollectionRef> {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error) {
        reject(error);
      }
    });
  }

  getAllDocumentsFromCollection(
    path: String,
    filter?: Array<Filter>
  ): Promise<Array<DocumentRef>> {
    return new Promise((resolve, reject) => {});
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

  createDocument(path: String, data: Entity): Promise<DocumentRef> {
    return new Promise(async (resolve, reject) => {
      try {
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
    filter: Array<Filter>
  ): Promise<Array<DocumentRef>> {
    return new Promise(async (resolve, reject) => {
      try {
        const documentSnap = await this.service.collection(path).get();
        const finalResult = [];
        documentSnap.forEach((doc) => {
          finalResult.push({
            
          })
        })

        if (filter) {
          // TO DO: IMPLEMENT FILTERING  
        }
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
