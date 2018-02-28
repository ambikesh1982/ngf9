import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { Fooditem } from './fooditem';
import { DocumentReference } from '@firebase/firestore-types';
import { UploadTaskSnapshot } from '@firebase/storage-types';

@Injectable()
export class ProductService {
  storagePath: string;
  fooditemsPath: string;
  images: string[];
  productCollectionRef: AngularFirestoreCollection<Fooditem>;
  productDocumentRef: AngularFirestoreDocument<Fooditem>;
  productData$: Observable<Fooditem>;
  task: AngularFireUploadTask;
  currentDocumentID$: Observable<string>;
  currentDocumentID: string;
  snapshot$: Observable<UploadTaskSnapshot>;
  uploadPercentage$: Observable<number>;
  downloadURL$: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore) {
    this.images = [];
    this.productData$ = null;
    this.storagePath = 'f9_fooditems'; // Path of the application storage bucket.
    this.fooditemsPath = 'f9_fooditems'; // Path of fooditem collection.
    this.productCollectionRef = this.db.collection<Fooditem>(this.fooditemsPath); // Create a reference for DB operations.
  }

  getProductData(documentId: string): Observable<Fooditem> {
    const docRef = `${this.fooditemsPath}/${documentId}`;
    console.log('docRef: ', docRef);
    this.productDocumentRef = this.db.doc<Fooditem>(docRef);
    return this.productDocumentRef.valueChanges();
  }

  // this method get execute while adding new fooditem. Creates a new DB entry and stores document ID for future reference.
  initializeProduct(defaultFooditem: Fooditem) {
    this.productCollectionRef.add(defaultFooditem)
      .then(docRef => {
        this.currentDocumentID$ = Observable.of(docRef.id);
        this.currentDocumentID = docRef.id;
        this.productData$ = this.getProductData(docRef.id);
        console.log('After adding fooditem: ', docRef.id);
      }).catch(error => {
        console.log('Error while adding default fooditem to db:', error);
      });
  }


  // File upload methods

  getDownloadURLs(imagePaths: string[]) {
    for (let index = 0; index < imagePaths.length; index++) {
      const element = imagePaths[index];
      const storageRef = this.storage.ref(element);
    }
  }

  uploadFiles(files: FileList) {
    console.log('Selected files: ', files);
    for (let index = 0; index < files.length; index++) {
      this.uploadSingleFile(files[index]);
    }
  }

  private uploadSingleFile(file: File) {
    const fileStoragePath = `${this.storagePath}/${new Date().getTime()}_${file.name}`;
    console.log('File storage path: ', fileStoragePath);
    this.task = this.storage.upload( fileStoragePath, file );
    this.downloadURL$ = this.task.downloadURL();
    this.uploadPercentage$ = this.task.percentageChanges();

    this.snapshot$ = this.task.snapshotChanges().pipe(
      tap( res => {
        console.log('Inside PIPE:', res);
        if (res.bytesTransferred === res.totalBytes) {
          // Save image paths to images array in firebase.
          // this.saveImagePath(this.currentDocumentID, fileStoragePath);
          this.saveImagePath(this.currentDocumentID, res.downloadURL);
        }
      })
    );
  }

  // Save image path to firebase after completion of image upload to firebase storage.
  saveImagePath(documentId: string, data: string) {
    this.images.push(data);
    this.productCollectionRef.doc(documentId).update({images: this.images});
  }

  // When user deletes an image.
  deleteImage() {}


}
