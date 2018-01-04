import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './user/user.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent],
  providers: []
})
export class AuthModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [ UserService, AuthGuard ]
    }
  }
}
