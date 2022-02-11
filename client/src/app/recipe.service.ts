import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Recipe, RecipeDetails, RecipePostDetails} from "./model";

const URL_POST_RECIPE = 'http://localhost:8080/recipe';

@Injectable()
export class RecipeService {

  constructor(private http:HttpClient) {

    }

  getAllRecipes(): Promise<Recipe[]> {
    // return lastValueFrom(this.http.get<Recipe[]>('http://localhost:8080/'))

    // FOR HEROKU DEPLOYMENT
    return lastValueFrom(this.http.get<Recipe[]>('/'))
    }

  getRecipeById(recipeId): Promise<RecipeDetails> {
    // return lastValueFrom(this.http.get<RecipeDetails>(`http://localhost:8080/recipe/${recipeId}`))

    // FOR HEROKU DEPLOYMENT
    return lastValueFrom(this.http.get<RecipeDetails>(`/recipe/${recipeId}`))

  }

  postRecipeForm(recipePostDetails:RecipePostDetails): Promise<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    const params = new HttpParams()
      .set('Title', recipePostDetails.title)
      .set('Image', recipePostDetails.image)
      .set('Ingredients', recipePostDetails.ingredients)
      .set('Instruction', recipePostDetails.instruction)


    return lastValueFrom(this.http.post<string>(URL_POST_RECIPE,params.toString(),{headers}));
  }


}
