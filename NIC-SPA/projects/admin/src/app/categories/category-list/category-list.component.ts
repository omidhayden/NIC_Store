import { Category } from './../../_models/category';
import { AlertifyService } from './../../../../../../src/app/alertify.service';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from './../../_services/category.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'admin-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort,  {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  displayedColCats: string[] = ['id', 'name', 'delete'];
  categorySource:any;
  dataSource=new  MatTableDataSource();
  catCreationPanel : boolean= false
  addSubsPanel: boolean = false
  catDataInAddSubToggle:any;

  displayedColSubCats: string[] = ['id', 'name', 'delete'];
  relatedSubCategory: any = false 
  
  selectedRowIndex: number = -1;
  newCatdata: any;
  newSubCatData: any;
  categoryForm : FormGroup;
  subCategoryForm: FormGroup;

  
  constructor(
    private categoryService: CategoryService, 
    private fb: FormBuilder,
    private alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.categoryForm =  this.fb.group({
      name: new FormControl('', []),
      subs: new FormControl('', [])
    });
    this.subCategoryForm = this.fb.group({
      subs: new FormControl('', [Validators.required])
    })



     this.categoryService.getCats().then((r)=>{
       this.categorySource = r;
       
       this.dataSource = new MatTableDataSource(this.categorySource)
       console.log(r);

      //  console.log(this.Source);
      setTimeout(() => { 
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
     });
      
        // this.dataSource.sort = this.sort;
        console.log(this.dataSource)
  
    
    })
  

  }
  ngAfterViewInit() {
  //   setTimeout(() => { 
  //     this.dataSource.sort = this.sort;
  //  });
    
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  populateSubs(catId){
    this.categoryService.getSubsWithCat(catId).then((r)=> {
      this.relatedSubCategory = r;
      this.selectedRowIndex = catId;
      
    },(e)=> {
      this.alertify.error("Could not populate subs");
    })
  }

  openCatCreation(){
    this.catCreationPanel = !this.catCreationPanel
  }
  closeSubCatCreation(){
    this.addSubsPanel = false;
  }
  
  AddCategory(){
    
    const subsSeparation =this.categoryForm.get("subs").value;
    if(subsSeparation != null){
      this.newCatdata = {
        name: this.categoryForm.get("name").value,
        SubCategoryName: subsSeparation.split(",")
      }
    }
    if(subsSeparation == ""){
      this.newCatdata = {
        name: this.categoryForm.get("name").value
        
      }
    }   
    
    

   this.categoryService.addCategoriesWithsubs(this.newCatdata).then((r)=> {
     this.alertify.success("Category successfully added!")
     this.categorySource.push(r);
     this.ngOnInit();
     
     
   }, (e)=>{
     this.alertify.error("We could not save that category!")
   })
  }


  AddSubCategory(){
    const subsSeparation = this.subCategoryForm.get("subs").value;
    this.newSubCatData = {
      Name: subsSeparation.split(",")
    }
    

     this.categoryService.addSubsForCategory(this.catDataInAddSubToggle.id, this.newSubCatData)
     .then((r) => {
        this.alertify.success("Subs sucessfully added"); 
        this.relatedSubCategory=r;
        this.subCategoryForm.reset();
        this.addSubsPanel = false;
     }, (e)=>{
       this.alertify.error("We could not save that sub category!")
     })
  }

  DeleteCat(id){
    this.alertify.confirm("Are you sure you want to delete this category? related sub categories will be deleted!", ()=>{
        this.categoryService.deleteCat(id).then(()=>{
          this.alertify.success("Category successfully deleted!")
            this.ngOnInit();
        },()=>{
          this.alertify.error("Problem on deleting")
        })
    })
  }

  DeleteSubCat(id){
    this.alertify.confirm("Are you sure you want to delete this category?", ()=>{
      this.categoryService.deleteSubCat(id).then(()=>{
        this.alertify.success("SubCategory successfully deleted!");
        this.populateSubs(this.selectedRowIndex);
        
      },()=>{
        this.alertify.error("Problem on deleting")
      })
    })
  }

  AddSubsToggle(row){
      this.addSubsPanel = true;
      this.catDataInAddSubToggle =row;
      
  }
}
