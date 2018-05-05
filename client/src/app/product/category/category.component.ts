import { Component, OnInit } from '@angular/core';
import { ProductService } from "app/product/product.service";

import { Category, CategoryTest } from "app/product/product.component";
import {Message} from 'primeng/primeng';
import { CategoryService } from 'app/product/category/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;    
  selectedCategoryForDelete: Category
  categoryDto: PrimeCategory[];
  displayDialog: boolean;

   msgs: Message[] = [];

  category: CategoryTest = new PrimeCategory();

  constructor(private categoryService: CategoryService, private productService: ProductService,  private formBuilder: FormBuilder, private toastr: ToastsManager) { }

  ngOnInit() {

    this.categoryForm = this.formBuilder.group(
        {
          'name': [null,Validators.required],
          'description': ['']
        }
      );

    this.getCategoryDetails();
  }

      showSuccess(severity: string, summary: string, detail: string) {
        this.msgs = [];
        this.msgs.push({severity: severity, summary: summary, detail: detail});
    }


    getCategoryDetails(): void {
      this.productService.getCategoryDetails()
      .subscribe((categories: Category[]) => {
      this.categoryDto = categories;
      console.log('CategoryList' + this.categoryDto);
        });
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

    showDialogToAdd() {
        this.displayDialog = true;
    }
}

class PrimeCategory implements CategoryTest {
    constructor(public name?, public description?) {}
}

export class Response {
    message: string;
}

