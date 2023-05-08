import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewComponent} from "./new/new.component";
import {ProductRequestComponent} from "./product-request/product-request.component";
import {DetailsComponent} from "./details/details.component";
import {UpdateComponent} from "./update/update.component";

const routes: Routes = [
  {path: '', component: ProductRequestComponent},
  {path: 'new', component: NewComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'update/:id', component: UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
