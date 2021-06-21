import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping-list/shoppingList.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  //used to transfer data from outside to input
  // @Input() recipe: Recipe;
  recipe: Recipe;
  recipeIndex: number;

  constructor(private shoppingService: ShoppingService, private activatedRoute: ActivatedRoute,
     private recipeService: RecipeService, private router:Router) { }

  ngOnInit(): void {
    // console.log('recipeData', this.recipe)
    this.activatedRoute.params.subscribe((param: Params) => {
      this.recipeIndex = +param['id'];
      this.recipe = this.recipeService.getRecipe(+param['id']);
    });
  }

  addToShoppingList(){
    this.recipe.ingredient.forEach(eachIngredient => {
      this.shoppingService.addIngredient(new Ingredient(eachIngredient.name, eachIngredient.amount));
    })
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.recipeIndex);
    this.router.navigate(['/recipes']);
  }


}
