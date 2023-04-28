import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewComponent} from "./new/new.component";
import {ProductRequestComponent} from "./product-request/product-request.component";

const routes: Routes = [
  {path: '', component: ProductRequestComponent},
  {path: 'new', component: NewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
