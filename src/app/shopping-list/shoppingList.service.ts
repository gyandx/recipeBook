import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';
import { Ingredient } from "../Shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})

export class ShoppingService{

  // ingredientAdded = new EventEmitter<Ingredient[]>();
  ingredientAdded = new Subject<Ingredient[]>();
  editIngredientMode = new Subject<number>();
  ingredients: Ingredient[] = [new Ingredient('Apple' ,5), new Ingredient('Orange', 7)];

  getIngredients(){
    return [...this.ingredients];
  }

  getSingleIngredient(index){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    // this.ingredientAdded.emit([...this.ingredients]);
    this.ingredientAdded.next([...this.ingredients]);
  }

  updateIngredient(index: number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;
    this.ingredientAdded.next([...this.ingredients]);
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientAdded.next([...this.ingredients]);
  }
}
