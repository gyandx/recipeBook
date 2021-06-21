import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Ingredient } from "./ingredient.model";
import {  AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  saveRecipe() {
    const recipes = this.recipeService.getRecipeService();
    this.http.put(`https://recipeproject-be546-default-rtdb.firebaseio.com/recipes.json`, recipes).subscribe(
      res => {
        console.log(res);
      }
    )
  }

  fetchRecipe() {
    // take is used to call observable the no. of times we want
    return this.http.get<Recipe[]>(`https://recipeproject-be546-default-rtdb.firebaseio.com/recipes.json`).pipe(map(
      recipe => {
        // this map here is js array map function
        return recipe.map(eachRecipe => {
          return { ...eachRecipe, ingredient: eachRecipe.ingredient ? eachRecipe.ingredient : [] }
        })
      }
    ), tap(recipes => {
      this.recipeService.setRecipe(recipes);
    })
  )}
}
