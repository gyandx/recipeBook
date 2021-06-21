import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Component({
  selector:'app-recipes',
  templateUrl: './recipes.component.html',
  // providers:[RecipeService]
})

export class RecipeComponent implements OnInit{

  // selectedRecipe: Recipe;
  subscription: Subscription;
  recipeSelected: Recipe;

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.subscription = this.recipeService.selectedRecipe.subscribe((recipe: Recipe) => {
    //   this.recipeSelected = recipe;
    // })
  }

  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   this.subscription.unsubscribe();
  // }

  // selectedRecipe(event: Recipe){
  //   this.recipeSelected = event;
  //   // console.log(this.recipeSelected, 'eve')
  // }
}
