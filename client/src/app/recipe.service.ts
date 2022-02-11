import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Recipe} from "./model";

@Injectable()
export class RecipeService {
  constructor(private http:HttpClient) {

    }

  getAllRecipes(): Promise<Recipe[]> {
      return lastValueFrom(this.http.get<Recipe[]>('http://localhost:8080/'))
    }


}
