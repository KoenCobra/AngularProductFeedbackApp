import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductRequestComponent } from './product-request/product-request.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FeedbackButtonComponent } from './shared/feedback-button/feedback-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductRequestComponent,
    SideBarComponent,
    ToolbarComponent,
    FeedbackButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
