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
    return new Promise((resolve, reject) => {});
  }

  deleteCollection(path: String): Promise<Boolean> {
    return new Promise((resolve, reject) => {});
  }

  // Return MAP <CollectionId, Success || Failure>
  deleteCollectionBatch(path: String): Promise<Map<String, Boolean>> {
    return new Promise((resolve, reject) => {});
  }

  listCollections(
    path: String,
    filter?: Array<Filter>
  ): Promise<Array<CollectionRef>> {
    return new Promise((resolve, reject) => {});
  }

  getCollection(path: String): Promise<CollectionRef> {
    return new Promise((resolve, reject) => {});
  }

  getAllDocumentsFromCollection(
    path: String,
    filter?: Array<Filter>
  ): Promise<Array<DocumentRef>> {
    return new Promise((resolve, reject) => {});
  }

  createDocument(path: String, data: Entity): Promise<DocumentRef> {
    return new Promise((resolve, reject) => {});
  }

  // Return MAP <DocumentId, Success || Failure
  createDocumentBatch(
    documents: Map<String, Entity>
  ): Promise<Array<DocumentRef>> {
    return new Promise((resolve, reject) => {});
  }

  updateDocument(path: String, data: Entity): Promise<Boolean> {
    return new Promise((resolve, reject) => {});
  }

  // Return MAP <DocumentId, Success || Failure
  updateDocumentBatch(
    documents: Map<String, Entity>
  ): Promise<Map<String, Boolean>> {
    return new Promise((resolve, reject) => {});
  }

  __parsePath(path: String) {}
}
