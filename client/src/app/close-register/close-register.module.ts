import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseRegisterComponent } from './close-register.component';
import { CloseRegistorService } from './close-registor.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { CloseRegisterRoutingModule } from 'app/close-register/close-register-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CloseRegisterRoutingModule
  ],
  declarations: [CloseRegisterComponent],
  providers: [CloseRegistorService]
})
export class CloseRegisterModule { }
