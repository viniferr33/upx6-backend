import { Entity } from "./types";

export interface Filter {
  key: String;
  operator: String;
  value: String;
}

export interface DocumentRef {
  id: String;
  docRef: String;
  data: Map<String, any>;
}

export interface CollectionRef {
  id: String;
  colRef: String;
  documents?: Array<String>;
}

export default interface IDatabaseNoSQL {
  createCollection(path: String): Promise<CollectionRef>;
  deleteCollection(path: String): Promise<Boolean>;
  // Return MAP <CollectionId, Success || Failure>
  deleteCollectionBatch(path: String): Promise<Map<String, Boolean>>;
  listCollections(
    path: String,
    filter?: Array<Filter>
  ): Promise<Array<CollectionRef>>;
  getCollection(path: String): Promise<CollectionRef>;
  getAllDocumentsFromCollection(
    path: String,
    filter?: Array<Filter>
  ): Promise<Array<DocumentRef>>;

  createDocument(path: String, data: Entity): Promise<DocumentRef>;
  // Return MAP <DocumentId, Success || Failure
  createDocumentBatch(
    documents: Map<String, Entity>
  ): Promise<Array<DocumentRef>>;
  updateDocument(path: String, data: Entity): Promise<Boolean>;
  // Return MAP <DocumentId, Success || Failure
  updateDocumentBatch(
    documents: Map<String, Entity>
  ): Promise<Map<String, Boolean>>;
}
