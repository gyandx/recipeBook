import {EventEmitter, Injectable} from "@angular/core";
import { Subject } from "rxjs";
// import { Subject } from 'rxjs';
import { Ingredient } from "../Shared/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn:'root'
})

export class RecipeService{

  // selectedRecipe = new EventEmitter<Recipe>();
  // selectedRecipe = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  // private recipeList: Recipe[] = [
  //   new Recipe('Medu Vara', 'Delicious In Taste',
  //   'https://www.indianhealthyrecipes.com/wp-content/uploads/2014/07/medu-vada-recipe.jpg',
  //   [
  //     new Ingredient('Arhar Dal', 1),
  //     new Ingredient('Cooking Oil', 1)
  //   ]
  //   ),
  //   new Recipe('Samosa', 'Awesome In Taste', 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg',
  //   [
  //     new Ingredient('Maida', 1),
  //     new Ingredient('Potato', 2)
  //   ])
  // ]
  private recipeList: Recipe[] = [];

  setRecipe(recipe: Recipe[]){
    this.recipeList = recipe;
    this.recipeChanged.next([...this.recipeList]);
  }

  getRecipe(id: number){
    return this.recipeList.slice()[id];
  }

  getRecipeService(){
    return [...this.recipeList];
  }

  addRecipe(recipe: Recipe){
    this.recipeList.push(recipe);
    this.recipeChanged.next(this.recipeList.slice());
  }

  updateRecipe(id: number, recipe: Recipe){
    this.recipeList[id] = recipe;
    this.recipeChanged.next(this.recipeList.slice());
  }

  deleteRecipe(id: number){
    this.recipeList.splice(id,1);
    this.recipeChanged.next(this.recipeList.slice());
  }

}
