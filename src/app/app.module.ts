import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductRequestComponent } from './product-request/product-request.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NoFeedbackComponent } from './shared/no-feedback/no-feedback.component';
import { NewComponent } from './new/new.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from "@angular/forms";
import { NgToastModule } from 'ng-angular-popup';
import { DetailsComponent } from './details/details.component';
import { CommentComponent } from './comment/comment.component';
import { ButtonComponent } from './shared/button/button.component';
import { FeedbackRequestComponent } from './shared/feedback-request/feedback-request.component';
import { BacklinkComponent } from './shared/backlink/backlink.component';
import { InputComponent } from './shared/input/input.component';
import { UpdateComponent } from './update/update.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTabsModule} from '@angular/material/tabs';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { CategoriesComponent } from './shared/categories/categories.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductRequestComponent,
    SideBarComponent,
    ToolbarComponent,
    NoFeedbackComponent,
    NewComponent,
    DetailsComponent,
    CommentComponent,
    ButtonComponent,
    FeedbackRequestComponent,
    BacklinkComponent,
    InputComponent,
    UpdateComponent,
    RoadmapComponent,
    MobileMenuComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgToastModule,
    DragDropModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
