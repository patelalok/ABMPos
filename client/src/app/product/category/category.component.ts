import { Component, OnInit } from '@angular/core';
import { ProductService } from "app/product/product.service";

import { Category, SubCategory } from "app/product/product.component";
import { Message } from 'primeng/primeng';
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
    selectedCategoryForDelete: Category;
    selectedCategoryForUpdate: Category;
    categoryDto: Category[];
    displayDialog: boolean;
    displaySubCategoryDialog: boolean;
    subCategoryDto: SubCategory[] = [];
    selectedCategoryForAddSubCategory: Category;

    msgs: Message[] = [];

    category = new Category();

    constructor(private categoryService: CategoryService, private productService: ProductService, private formBuilder: FormBuilder, private toastr: ToastsManager) { }

    ngOnInit() {

        this.categoryForm = this.formBuilder.group(
            {
                'name': [null, Validators.required],
                'description': [''],
                'ecommerce': [''],
                'categoryId': ['']
            }
        );
        this.subCategoryForm = this.formBuilder.group(
            {
                'name': [null, Validators.required],
                'description': [''],
                'categoryId': [''],
                'ecommerce': [''],
                'id': ['']

            }
        );

        this.getCategoryDetails();
    }

    showSuccess(severity: string, summary: string, detail: string) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: summary, detail: detail });
    }

    getSubCategoryByCategoryId(category: Category) {
        this.productService.getSubCategoryDetailsByCategoryId(category.categoryId)
            .subscribe((subCategory: SubCategory[]) => {
                this.subCategoryDto = subCategory;
                this.subCategoryDto = this.subCategoryDto.slice();
                console.log('sub CategoryId', this.subCategoryDto);
            })
    }


    getCategoryDetails(): void {
        this.productService.getCategoryDetails()
            .subscribe((categories: Category[]) => {
                this.categoryDto = categories;
            });
    }
    onCategorySelect(event) {
        this.selectedCategoryForAddSubCategory = this.categoryDto[event.target.selectedIndex];
    }

    addCategory() {

        let newCategory = this.categoryForm.value;
        this.categoryService.addOrUpdateCategory(this.categoryForm.value)
            .subscribe(data => {

                if (data) {
                    this.toastr.success('Category Added Successfully!!', 'Success!!');
                    // this is update
                    if (newCategory.categoryId > 0) {
                        let index = this.categoryDto.findIndex((el) => el.categoryId == newCategory.categoryId);
                        this.categoryDto[index] = newCategory;
                    }
                    else {
                        this.categoryDto.push(newCategory);
                    }
                    this.categoryDto = this.categoryDto.slice();
                }
                console.log(data);
            },
                error => {
                    this.toastr.error('Something Goes Wrong!!', 'Error!!')
                });
        this.categoryForm.get('name').setValue('');
        this.categoryForm.get('description').setValue('');
        this.categoryForm.get('ecommerce').setValue('');
        this.displayDialog = false;

    }

    addSubCategory() {

        let newSubCategory: SubCategory = this.subCategoryForm.value;
        newSubCategory.categoryId = this.selectedCategoryForAddSubCategory.categoryId;

        this.categoryService.addOrUpdateSubCategory(newSubCategory)
            .subscribe((subCategory) => {
                if (subCategory.statusText == "OK") {

                    if(newSubCategory.id > 0){

                        this.toastr.success('Sub Category Updated Successfully!!', 'Success!!');
                        let index = this.subCategoryDto.findIndex((el) => el.id == newSubCategory.id);
                        this.subCategoryDto[index] = newSubCategory;
                        this.subCategoryDto = this.subCategoryDto.slice();

                    }
                    else {
                        this.toastr.success('Sub Category Added Successfully!!', 'Success!!');
                        this.subCategoryDto.push(newSubCategory);
                    }

                    this.displaySubCategoryDialog = false;

                }
            },
                error => {
                    this.toastr.error('Something Goes Wrong!!', 'Error!!')
                });

        console.log('subCategory To add', newSubCategory);

    }
    
    setCategoryForUpdate(category: Category) {
        this.categoryForm.get('name').setValue(category.name);
        this.categoryForm.get('description').setValue(category.description);
        this.categoryForm.get('categoryId').setValue(category.categoryId);
        this.categoryForm.get('ecommerce').setValue(category.ecommerce);

        this.selectedCategoryForUpdate = category;
        this.displayDialog = true;
    }
    setSubCategoryForUpdate(subCategory: SubCategory){

        this.subCategoryForm.get('id').setValue(subCategory.id);
        this.subCategoryForm.get('name').setValue(subCategory.name);
        this.subCategoryForm.get('description').setValue(subCategory.description);
        this.subCategoryForm.get('categoryId').setValue(subCategory.categoryId);
        this.subCategoryForm.get('ecommerce').setValue(subCategory.ecommerce);

        this.displaySubCategoryDialog = true;
    }

    setCategoryForDelete(cate: Category) {
        this.selectedCategoryForDelete = cate;
    }

    deleteCategory() {
        this.categoryService.deleteCategory(this.selectedCategoryForDelete.categoryId)
            .subscribe((data) => {
                if (data && data.status == 200) {
                    let index = this.categoryDto.findIndex((el) => el.name == this.selectedCategoryForDelete.name);
                    if (index > -1) {
                        this.categoryDto.splice(index, 1);
                        this.categoryDto = this.categoryDto.slice();
                        this.toastr.success(data.json().message, 'Success!!');
                    }
                    // this.categoryDto = this.categoryDto.splice(0, index).concat(this.categoryDto.splice(index));            
                }
                else {
                    this.toastr.error(data.json().message, 'Error!!');
                }
            },
                error => {
                    this.toastr.error('Something Goes Wrong!!', 'Error!!')
                }
            )
    }

    showAddCategoryPopup() {
        this.categoryForm.reset();
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

