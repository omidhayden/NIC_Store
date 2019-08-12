import { OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductService } from '../../_services/product.service';
import { CategoryService } from '../../_services/category.service';
import { AlertifyService } from 'src/app/alertify.service';
import { async } from '@rxweb/reactive-form-validators/decorators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'admin-sub-select',
  templateUrl: './sub-select.component.html',
  styleUrls: ['./sub-select.component.css']
})
export class SubSelectComponent implements OnInit {

  @ViewChild('search', {static:true}) searchTextBox: ElementRef;
  complete: any= [];
  data: string[] = [];
  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues :any =[];
  // productId: number;
  @Input() product: any;
  @Output() returnSubs  = new EventEmitter();
  subcat:any=[]
  subData: any =[];
 
  filteredOptions: Observable<any[]>;
  constructor(
    private cdr: ChangeDetectorRef,
    public subService: CategoryService,
    private alertify: AlertifyService)
    {

    }
 

  ngOnInit() {

   
    this.subService.getSubs()
    .then((r)=>setTimeout(()=>{
      this.complete = r;
      this.complete.forEach(e => {
          if(this.data) {this.data.push(e["name"])}
           this.cdr.detectChanges();
         

          
    /**
     * Set filter event based on value changes 
     */
    this.filteredOptions = this.searchTextboxControl.valueChanges
    .pipe(
      startWith<any>(''),
      map(name =>  this._filter(name))
    );
      });
      if(this.product){
        this.product.forEach((e) => {
            this.selectedValues.push(e["subCategoryName"])
        });
      }
    }));
    

    
    
  }

  openedChange(e) {
    // Set search textbox value as empty while opening selectbox 
    this.searchTextboxControl.patchValue('');
    // Focus to search textbox while clicking on selectbox
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }
















  /**
   * Used to filter data based on search input 
   */
  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state 
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }

/**
 * Remove from selected values based on uncheck
 */
  selectionChange(event) {
    if (event.isUserInput && event.source.selected == false) {
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1)
    }
  }

  
  /**
   * Clearing search textbox value 
   */
  clearSearch(event) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  /**
   * Set selected values to retain the state 
   */
  setSelectedValues() {
    // console.log('selectFormControl', this.selectFormControl.value);
    if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
      this.selectFormControl.value.forEach((e) => {
        if (this.selectedValues.indexOf(e) == -1) {
          this.selectedValues.push(e);
          
        }
      });


    }


   
    
    if(this.selectFormControl.value)
    {
       
        if(this.subData.length !== 0) {
          this.subData.splice([])
          
        }
      
      this.selectFormControl.value.forEach(element => {
        let s = this.complete.find( x=> x["name"] == element)
        
           //console.log(s["id"]);

          if(s){
            
            this.subData.push(s["id"])

          }
        
        
        
      });
      this.returnSubs.emit(this.subData);
      //console.log("SUBDATA",this.subData)
    }

    // console.log("RETURN EMIT TO PARENT",this.returnSubs);
    


   
  }
  

}
