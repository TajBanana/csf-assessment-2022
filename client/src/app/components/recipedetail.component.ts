import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {RecipeDetails} from "../model";

@Component({
  selector: 'app-recipedetail',
  templateUrl: './recipedetail.component.html',
  styleUrls: ['./recipedetail.component.css']
})
export class RecipedetailComponent implements OnInit {

  recipeId: String;
  recipeDetails: RecipeDetails;

  constructor(private activatedRoute: ActivatedRoute, private recipeSvc: RecipeService, private router:Router) { }

  ngOnInit(): void {
    this.recipeId = this.activatedRoute.snapshot.params['recipeId'];
    console.info('>>>> recipeId: ',this.recipeId);
    this.recipeSvc.getRecipeById(this.recipeId)
      .then(result => this.recipeDetails = result);
    console.info('>>>> recipeDetails: ',this.recipeDetails);

  }

  back() {
    this.router.navigate(['/'])
  }
}
