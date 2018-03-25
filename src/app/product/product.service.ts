import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { Fooditem } from './fooditem';
import { DocumentReference } from '@firebase/firestore-types';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import * as firebase from 'firebase';

@Injectable()
export class ProductService {
  atLeastOneImageAdded: boolean;
  storagePath: string;
  fooditemsPath: string;
  images: string[];
  previewImage: string;
  productCollectionRef: AngularFirestoreCollection<Fooditem>;
  productDocumentRef: AngularFirestoreDocument<Fooditem>;
  productData$: Observable<Fooditem>;
  task: AngularFireUploadTask;
  currentDocumentID: string;
  snapshot$: Observable<UploadTaskSnapshot>;
  uploadPercentage$: Observable<number>;
  downloadURL$: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore) {
      this.atLeastOneImageAdded = false;
      this.images = [];
      this.productData$ = null;
      this.storagePath = 'f9_fooditems'; // Path of the application storage bucket.
      this.fooditemsPath = 'f9_fooditems'; // Path of fooditem collection.
      this.productCollectionRef = this.db.collection<Fooditem>(this.fooditemsPath); // Create a reference for DB operations.
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  // this method get execute while adding new fooditem.
  // Creates a new DB entry and stores document ID for future reference.
  initializeProduct(): string {
    this.currentDocumentID = this.db.createId();
    this.productData$ = this.getProductData(this.currentDocumentID);
    return this.currentDocumentID;
  }

  getProductData(documentId: string): Observable<Fooditem> {
    const docRef = `${this.fooditemsPath}/${documentId}`;
    console.log('docRef: ', docRef);
    this.productDocumentRef = this.db.doc<Fooditem>(docRef);
    return this.productDocumentRef.valueChanges();
  }


  async createProduct(fooditem: Fooditem): Promise<string> {
    fooditem.id = this.currentDocumentID;
    const promise = this.productCollectionRef.add(fooditem);

    await promise.then(res => {
      console.log('New fooditem created!!');
    }, err => {
      console.log('Error during create fooditem: ', err);
    });

    return this.currentDocumentID;
  }

  // File upload methods

  getDownloadURL(imagePath: string) {
    const storageRef = this.storage.ref(imagePath);
  }


  uploadFiles(files: FileList) {
    console.log('Selected files: ', files);
    for (let index = 0; index < files.length; index++) {
      this.uploadSingleFile(files[index]);
    }
  }


  private uploadSingleFile(file: File) {
    const fileStoragePath = `${this.storagePath}/${this.currentDocumentID}/${new Date().getTime()}_${file.name}`;
    this.task = this.storage.upload( fileStoragePath, file );
    this.downloadURL$ = this.task.downloadURL();
    this.uploadPercentage$ = this.task.percentageChanges();

    this.snapshot$ = this.task.snapshotChanges().pipe(
      tap( res => {
        console.log('Inside PIPE:', res);
        if (res.bytesTransferred === res.totalBytes) {
          this.atLeastOneImageAdded = true;
          this.images.push(res.downloadURL);
          this.previewImage = res.downloadURL;
        }
      })
    );
  }

  // When user deletes an image.
  deleteImage() {}


}
