import { Injectable } from "@angular/core";
import {  ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../Shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: 'root'
})

export class RecipeServiceResolver implements Resolve<Recipe[]> {

  constructor(private dataService: DataStorageService, private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipe = this.recipeService.getRecipeService();

    if (recipe.length === 0){
      return this.dataService.fetchRecipe();
    }else{
      return recipe;
    }
  }

}
