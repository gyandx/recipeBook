import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscribe: Subscription;
  editMode: boolean = false;
  editedIndex: number;
  editedIngredient: Ingredient;

  // @ViewChild('nameInput') ingredientName: ElementRef;
  // @ViewChild('amountInput') ingredientAmount: ElementRef;
  // @Output() insertIngredient = new EventEmitter<Ingredient>();
  @ViewChild('ingredientForm') shoppingForm: NgForm;

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.subscribe = this.shoppingService.editIngredientMode.subscribe(index => {
      console.log(index, 'index')
      this.editedIndex = index;
      this.editMode = true;
      this.editedIngredient = this.shoppingService.getSingleIngredient(index);
      this.shoppingForm.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
      });
    });
  }

  addIngredient(ingredientForm: NgForm){
    // this.insertIngredient.emit(new Ingredient(this.ingredientName.nativeElement.value, this.ingredientAmount.nativeElement.value));
    // this.shoppingService.addIngredient(new Ingredient(this.ingredientName.nativeElement.value, this.ingredientAmount.nativeElement.value));
    const newIngredient = new Ingredient(ingredientForm.value.name, ingredientForm.value.amount);
    if (this.editMode){
      this.shoppingService.updateIngredient(this.editedIndex, newIngredient);
    }else{
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    ingredientForm.reset();
  }

  clearForm(){
    this.shoppingForm.reset();
    this.editMode = false;
  }

  deleteIngredient(){
   this.shoppingService.deleteIngredient(this.editedIndex);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
  }

}
