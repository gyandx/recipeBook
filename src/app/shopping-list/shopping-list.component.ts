import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // ingredients: Ingredient[] = [new Ingredient('Apple' ,5), new Ingredient('Orange', 7)];
  subscription: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingList: ShoppingService) { }

  ngOnInit(): void {
    //getting ingredients from shopping service
    this.ingredients = this.shoppingList.getIngredients();
    this.subscription = this.shoppingList.ingredientAdded.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  editItemIngredient(index: number){
    this.shoppingList.editIngredientMode.next(index);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  //method moved to shopping services
  // addIngredient(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

}
