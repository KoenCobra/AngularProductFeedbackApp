import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductRequestComponent } from './product-request/product-request.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FeedbackButtonComponent } from './shared/feedback-button/feedback-button.component';
import { NoFeedbackComponent } from './shared/no-feedback/no-feedback.component';
import { NewComponent } from './new/new.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from "@angular/forms";
import { NgToastModule } from 'ng-angular-popup';
@NgModule({
  declarations: [
    AppComponent,
    ProductRequestComponent,
    SideBarComponent,
    ToolbarComponent,
    FeedbackButtonComponent,
    NoFeedbackComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
