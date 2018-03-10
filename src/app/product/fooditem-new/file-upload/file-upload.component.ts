import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  selectedFileIndex: number;
  maxFileUploadCount: number;

  constructor( public product: ProductService) {
    this.selectedFileIndex = 0;
    this.maxFileUploadCount = 4;

  }

  ngOnInit() { }

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
    this.product.previewImage = img;
  }

  getImageURL(imagePath: string) {
    console.log('TODO: get image URL from firesotre: ', imagePath);
  }

}
