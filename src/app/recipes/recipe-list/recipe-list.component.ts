import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Recipe} from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  //used to emit or transfer or change data from child to parent using selectors
  // @Output() recipeSelected = new EventEmitter<Recipe>();

  // used in recipe service to store the data

  // recipeList: Recipe[] = [
  //   new Recipe('Medu Vara', 'Delicious In Taste', 'https://www.indianhealthyrecipes.com/wp-content/uploads/2014/07/medu-vada-recipe.jpg'),
  //   new Recipe('Samosa', 'Awesome In Taste', 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg')
  // ]

  recipeList: Recipe[];
  recipeDetail: Recipe;
  subscribe: Subscription;

  constructor(private recipeService: RecipeService, private route: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.subscribe = this.recipeService.recipeChanged.subscribe((recipe: Recipe[]) => {
      this.recipeList = recipe;
    })
    this.recipeList = this.recipeService.getRecipeService();
  }

  editRecipe(){
    this.route.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  // getItem(recipe: Recipe){
  //   this.recipeSelected.emit(recipe);
  // }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
  }

}
