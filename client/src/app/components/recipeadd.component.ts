import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {RecipeDetails, RecipePostDetails} from "../model";

@Component({
  selector: 'app-recipeadd',
  templateUrl: './recipeadd.component.html',
  styleUrls: ['./recipeadd.component.css']
})
export class RecipeaddComponent implements OnInit   {

  recipeForm!: FormGroup;
  recipePostResponse: string = '';

  constructor(private router: Router, private fb: FormBuilder, private recipeSvc: RecipeService) { }

  ngOnInit(): void {
    this.createRecipeForm();
  }

  createRecipeForm() {
    this.recipeForm = this.fb.group({
      title: this.fb.control('', [Validators.minLength(3),Validators.required]),
      image: this.fb.control('', [Validators.required]),
      instruction: this.fb.control('', [Validators.minLength(3),Validators.required]),
      ingredient: this.fb.array([this.fb.control('',[Validators.minLength(3)])])
    })
  }

  get ingredient() {
    return this.recipeForm.get('ingredient') as FormArray;
  }

  addIngredient() {
    this.ingredient.push(this.fb.control(''));
  }

  removeIngredient(i: number) {
    this.ingredient.removeAt(i);
  }

  async submitRecipe() {
    const recipe = this.recipeForm.value as RecipePostDetails;
    console.info('>>> recipe form details: ', recipe);
    await this.recipeSvc.postRecipeForm(recipe).then(r => this.recipePostResponse = r)
    alert(this.recipePostResponse)
    this.recipeForm.reset();
    this.back()
  }

  back() {
    this.router.navigate(['/'])
  }

}
