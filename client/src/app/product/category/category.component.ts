import { Component, OnInit } from '@angular/core';
import { ProductService } from "app/product/product.service";

import { Category, SubCategory } from "app/product/product.component";
import {Message} from 'primeng/primeng';
import { CategoryService } from 'app/product/category/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  subCategoryForm: FormGroup;    
  selectedCategoryForDelete: Category
  categoryDto: Category[];
  displayDialog: boolean;
  displaySubCategoryDialog: boolean;
  subCategoryDto: SubCategory[] =[];
  selectedCategoryForAddSubCategory: Category;

   msgs: Message[] = [];

  category = new Category();

  constructor(private categoryService: CategoryService, private productService: ProductService,  private formBuilder: FormBuilder, private toastr: ToastsManager) { }

  ngOnInit() {

    this.categoryForm = this.formBuilder.group(
        {
          'name': [null,Validators.required],
          'description': [''],
          'ecommerce':['']
        }
      );
      this.subCategoryForm = this.formBuilder.group(
        {
          'name': [null,Validators.required],
          'description': [''],
          'categoryId':[''],
          'ecommerce':['']
        }
      );

    this.getCategoryDetails();
  }

      showSuccess(severity: string, summary: string, detail: string) {
        this.msgs = [];
        this.msgs.push({severity: severity, summary: summary, detail: detail});
    }

    getSubCategoryByCategoryId(category : Category){
        this.productService.getSubCategoryDetailsByCategoryId(category.categoryId)
        .subscribe((subCategory: SubCategory[]) => {
          this.subCategoryDto = subCategory;
          this.subCategoryDto = this.subCategoryDto.slice();
          console.log('sub CategoryId', this.subCategoryDto);
        })    }


    getCategoryDetails(): void {
      this.productService.getCategoryDetails()
      .subscribe((categories: Category[]) => {
      this.categoryDto = categories;
        });
    }
    onCategorySelect(event){
        this.selectedCategoryForAddSubCategory = this.categoryDto[event.target.selectedIndex];
    }

    addCategory() {
        
        let newCategory = this.categoryForm.value;
        this.categoryService.addOrUpdateCategory(this.categoryForm.value)
        .subscribe(data => {

            if(data){
                this.toastr.success('Category Added Successfully!!', 'Success!!');
                this.categoryForm.get('name').setValue('');
                this.categoryForm.get('description').setValue('');
            }
            console.log(data);
          },
            error => {
                this.toastr.error('Something Goes Wrong!!', 'Error!!')
        });
        this.categoryDto.push(newCategory);
        this.categoryDto = this.categoryDto.slice();
        this.displayDialog = false;    
        
    }

    addSubCategory(){

        let newSubCategory: SubCategory = this.subCategoryForm.value;
        newSubCategory.categoryId = this.selectedCategoryForAddSubCategory.categoryId;

        this.categoryService.addOrUpdateSubCategory(newSubCategory)
        .subscribe((subCategory)=>{
            if(subCategory.statusText == "OK"){
                this.toastr.success('Sub Category Added Successfully!!', 'Success!!');
                this.subCategoryDto.push(newSubCategory);
                this.subCategoryDto = this.subCategoryDto.slice();
                this.displaySubCategoryDialog = false;    

            }
        },
        error => {
            this.toastr.error('Something Goes Wrong!!', 'Error!!')
    });
        
    console.log('subCategory To add',newSubCategory);

    }

    updateCategory(event) {
        this.categoryService.addOrUpdateCategory(event.data)
        .subscribe(data => {

            if(data){
                this.toastr.success('Category Updated Successfully!!', 'Success!!')
            }
            console.log(data);
          },
            error => {
                this.toastr.error('Something Goes Wrong!!', 'Error!!')
        });
    }


    setCategoryForDelete(cate: Category) {

        this.selectedCategoryForDelete = cate;
    }
    deleteCategory() {
        this.categoryService.deleteCategory(this.selectedCategoryForDelete.categoryId)
        .subscribe((data)=>{
            if(data && data.status == 200){
                let index = this.categoryDto.findIndex((el) => el.name == this.selectedCategoryForDelete.name);
                if(index > -1)
                {
                    this.categoryDto.splice(index,1);
                    this.categoryDto = this.categoryDto.slice();
                    this.toastr.success(data.json().message,'Success!!');
                }
                // this.categoryDto = this.categoryDto.splice(0, index).concat(this.categoryDto.splice(index));            
            }
            else {
                this.toastr.error(data.json().message,'Error!!');
            }
        },
        error => {
            this.toastr.error('Something Goes Wrong!!', 'Error!!')
    }
    )
    } 

    showAddCategoryPopup() {
        this.displayDialog = true;
    }
    showAddSubCategoryPopup() {
        this.subCategoryForm.get('categoryId').setValue(this.categoryDto[0].name);
        this.displaySubCategoryDialog = true;
    }
}

// class PrimeCategory {
//     constructor(public name?, public description?, public categoryId?, public ecommerce?) {}
// }

export class Response {
    message: string;
}

