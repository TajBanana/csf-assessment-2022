import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../recipe.service";
import {Recipe} from "../model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit {

  recipeList: Recipe[];

  constructor(private recipeSvc: RecipeService, private router:Router) { }

  ngOnInit(): void {
    this.recipeSvc.getAllRecipes().then(result => {
      console.log(result);
      console.log(typeof result);
      this.recipeList = result
    })
  }

  add() {
    this.router.navigate(['add'])
  }

  viewRecipe() {
    this.router.navigate(['recipe/'])
  }

  go(recipe: Recipe) {
    this.router.navigate(['recipe/', recipe.Id])
  }
}
