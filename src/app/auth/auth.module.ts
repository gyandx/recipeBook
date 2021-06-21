import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../Shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthorizationComponent } from "./auth.component";

@NgModule({
  declarations: [AuthorizationComponent],
  imports: [FormsModule, AuthRoutingModule, SharedModule],
  exports: [RouterModule]
})

export class AuthModule{}
