import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeId: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.recipeId = +param['id'];
      if (param['id'] !== null && param['id'] !== undefined){
        this.editMode = true;
      }else{
        this.editMode = false;
      }
      // this.editMode = param['id'] !== null;
      this.initForm();
    });
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.recipeId);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe[`ingredient`]){
        for (let eachIngredient of recipe.ingredient){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(eachIngredient.name),
            'amount': new FormControl(eachIngredient.amount)
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredient': recipeIngredients
    })

  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredient')).controls;
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  submitForm(){
    console.log(this.recipeForm);
    if (this.editMode){
      this.recipeService.updateRecipe(+this.recipeId, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    // this.route.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  cancelForm(){
    this.route.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  deleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }

}
