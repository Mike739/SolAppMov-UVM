import { inject, Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TaskI } from '../models/tasks.models';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore = inject(Firestore);
  
  constructor() {}

  getCollectionChanges<TaskI>(path: string){
    const refCollection = collection(this.firestore, path);
    return collectionData(refCollection) as Observable<TaskI[]>;
  }

  createDocument(data: TaskI, enlace: string){
    const document = doc(this.firestore, enlace);
    return setDoc(document, data);
  }

  createDocumentID(data: TaskI, enlace: string, id: string){
    const document = doc(this.firestore, `${enlace}/${id}`);
    return setDoc(document, data);
  }

  async updateDocumentID(data: any, enlace: string, id: string){
    const document = doc(this.firestore, `${enlace}/${id}`);
    return updateDoc(document, data);
  }

  deleteDocumentID(enlace: string, id: string){
    const document = doc(this.firestore, `${enlace}/${id}`);
    return deleteDoc(document);
  }

  createdIdDoc(){
    return uuid();
  }
}
