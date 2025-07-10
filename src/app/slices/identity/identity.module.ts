import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdentityRoutingModule } from './identity-routing.module';
import { GoogleCallbackComponent } from './auth/google-callback/google-callback.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    GoogleCallbackComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IdentityRoutingModule
  ]
})
export class IdentityModule { }
