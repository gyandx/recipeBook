import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-route.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeServiceResolver } from "./recipe-resolver.service";
import { RecipeComponent } from "./recipes.component";
import { RecipestartComponent } from "./recipestart/recipestart.component";

const appRoutes: Routes = [
  {path: '', component: RecipeComponent, canActivate: [AuthGuard] ,
   children: [
    {path: '', component: RecipestartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipeServiceResolver]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeServiceResolver]},
  ]},
]

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes),
  ],
  exports: [RouterModule]
})

export class RecipeRoutingModule{}
