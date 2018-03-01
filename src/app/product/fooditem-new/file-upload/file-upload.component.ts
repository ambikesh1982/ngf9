import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnChanges {

  selectedFileIndex: number;
  maxFileUploadCount: number;
  imagePreviewURL: string;
  @Input() images: string[];
  constructor( private product: ProductService) {
    this.selectedFileIndex = 0;
    this.maxFileUploadCount = 4;
  }

  ngOnInit() {
    // console.log('images[0]: ', this.images[0]);
    // this.imagePreviewURL = this.images[0];
  }

  ngOnChanges() {
    this.imagePreviewURL = this.images[0];
    console.log('Images data from firebase: ', this.images);
  }

  selectedFiles(imageFiles: FileList) {
    const fileCount = imageFiles.length;
    if ( this.selectedFileIndex < this.maxFileUploadCount ) {
      this.product.uploadFiles(imageFiles);
      this.manageFileIndex(fileCount);
      console.log('selectedFileIndex: ', this.selectedFileIndex);
    }
  }

  manageFileIndex(count: number) {
    this.selectedFileIndex = this.selectedFileIndex + count;
  }

  showPreview(img: string) {
    this.imagePreviewURL = img;
  }

}
