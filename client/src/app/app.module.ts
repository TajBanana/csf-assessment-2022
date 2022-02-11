import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecipelistComponent } from './components/recipelist.component';
import { RecipedetailComponent } from './components/recipedetail.component';
import { RecipeaddComponent } from './components/recipeadd.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {RecipeService} from "./recipe.service";
import {ReactiveFormsModule} from "@angular/forms";

const appRoutes= [
  {path:'', component:RecipelistComponent},
  {path:'recipe/:recipeId', component:RecipedetailComponent},
  {path:'add', component:RecipeaddComponent},
  {path:'**', component:RecipelistComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RecipelistComponent,
    RecipedetailComponent,
    RecipeaddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
