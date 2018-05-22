import { Component, OnInit } from '@angular/core';
import { Message } from "primeng/primeng";
import { ModelTest, Model } from "app/product/product.component";
import { ModelService } from "app/product/model/model.service";
import { ProductService } from "app/product/product.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'app-model',
    templateUrl: './model.component.html',
    styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
    modelForm: FormGroup;
    selectedModelForDelete: Model;
    modelDto: PrimeModel[];
    displayDialog: boolean;

    msgs: Message[] = [];
    model: ModelTest = new PrimeModel();

    constructor(private modelService: ModelService, private productService: ProductService, private formBuilder: FormBuilder, private toastr: ToastsManager) { }

    ngOnInit() {

        this.modelForm = this.formBuilder.group(
            {
                'name': [null, Validators.required],
                'description': ['']
            }
        );

        this.getModelDetails();
    }

    showSuccess(severity: string, summary: string, detail: string) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: summary, detail: detail });
    }


    getModelDetails(): void {
        this.productService.getModelDetails()
            .subscribe((models: Model[]) => {
                this.modelDto = models;
            });
    }

    addModel() {
        let newModel = this.modelForm.value;
        this.modelService.addOrUpdateModel(this.modelForm.value)
        .subscribe(
            (data) => {
                this.modelDto.push(newModel);
                this.modelDto = this.modelDto.slice();
                this.displayDialog = false;
              this.toastr.success('Model Added Successfully!!', 'Success!');
              this.modelForm.get('name').setValue('');
              this.modelForm.get('description').setValue('');

              console.log(data);
            },
            (error) => {
              this.toastr.error(error, 'Error!');
              console.log(JSON.stringify(error.json()));
          });
    }
    updateModel(event) {

        this.modelService.addOrUpdateModel(event.data)
        .subscribe(
            (data) => {
              this.toastr.success('Model Updated Successfully!!', 'Success!');
              console.log(data);
            },
            (error) => {
              this.toastr.error(error, 'Error!');
              console.log(JSON.stringify(error.json()));
          });
        this.modelDto.push(event.data);
        this.modelDto = this.modelDto.slice();
    }

    setModelForDelete(model: Model) {
        this.selectedModelForDelete = model;
    }

    deleteModel() {
        this.modelService.deleteModel(this.selectedModelForDelete.modelId)
        .subscribe((data)=>{
            if(data && data.status == 200){
                let index = this.modelDto.findIndex((el) => el.name == this.selectedModelForDelete.name); 
                if(index > -1)
                {
                    this.modelDto.splice(index,1);
                    this.modelDto = this.modelDto.slice();
                    this.toastr.success(data.json().message,'Success!!');
                }
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

class PrimeModel implements ModelTest {
    constructor(public name?, public description?) { }
}