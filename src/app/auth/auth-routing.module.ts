import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizationComponent } from "./auth.component";

const appRoutes: Routes = [
  {path: '', component: AuthorizationComponent}
]

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})


export class AuthRoutingModule {}
