import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// https://ng-bootstrap.github.io/#/home
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// My components.
import { NavbarComponent } from './navbar/navbar.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  // The components, directives, and pipes that belong to this NgModule.
  declarations: [
    NavbarComponent,
    LoginButtonComponent,
    FooterComponent
  ],
  // Other modules whose exported classes are needed by
  // component templates declared in this NgModule.
  imports: [
    CommonModule,
    // forChild creates a module that contains all the directives and
    // the given routes, but does not include the router service.
    RouterModule.forChild([]),
    NgbModule
  ],
  // The subset of declarations that should be visible and usable in
  // the component templates of other NgModules.
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
