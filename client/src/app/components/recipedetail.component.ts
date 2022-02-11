import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipedetail',
  templateUrl: './recipedetail.component.html',
  styleUrls: ['./recipedetail.component.css']
})
export class RecipedetailComponent implements OnInit {

  recipeTitle: String;
  recipeId: String;

  constructor(private activatedRoute: ActivatedRoute, private recipeSvc: RecipeService, private router:Router) { }

  ngOnInit(): void {
    this.recipeId = this.activatedRoute.snapshot.params['recipeId']
    this.getRecipe(this.recipeId);
  }

  getRecipe(recipeId) {
    console.info('>>>> recipeId: ',this.recipeId)
  }

  back() {
    this.router.navigate(['/'])
  }
}
