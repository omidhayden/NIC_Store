import { environment } from './../../../../../../src/environments/environment';

import { PhotoService } from './../../_services/photo.service';
import { ProductService } from './../../_services/product.service';
import { Photo } from './../../_models/photo';
import { Component, OnInit, Input} from '@angular/core';
import { AlertifyService } from 'src/app/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../_models/product';
import { FileUploader } from 'ng2-file-upload';



@Component({
  selector: 'admin-product-photo',
  templateUrl: './product-photo.component.html',
  styleUrls: ['./product-photo.component.css']
})
export class ProductPhotoComponent implements OnInit {
  
  @Input() photos: Photo []= [];
  // @Input() productId : number;
  productId: number;
  uploader:FileUploader ;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  imageDir = environment.imageDir;
  currentMain: Photo;



  constructor(
    private alertify: AlertifyService, 
    private router: Router,
    private route:ActivatedRoute,
    private photoService: PhotoService
    ) {
      route.params.subscribe(p =>{
        this.productId = +p['id'];
        if(isNaN(this.productId) || this.productId <=0){
          router.navigate(['/admin/products']);
          return;
        }
      });
    
   }
      
  ngOnInit() {
    this.initializeUploader();
  
  }
  
  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  setMainPhoto(photo: Photo)
  {
  
    this.photoService.setMainPhoto(this.productId, photo.id).subscribe(()=>{
      console.log("Change main photo success!");
      this.currentMain = this.photos.filter(p => p.isMain ===true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
    }, (error) =>{
      this.alertify.error(error);
    })
  }


  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'products/' +this.productId + '/photos',
      //Don't forget to pass the token for auth. Sec: 108
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024, 
    

    });
    this.uploader.onAfterAddingFile = (file) =>{file.withCredentials= false; };

    this.uploader.onSuccessItem = (item, response, status, headers) =>{
      if(response){
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          isMain: res.isMain
        };
        this.alertify.success("Successfully added.")
        this.photos.push(photo);
      }
    }


    
  }
}
  
