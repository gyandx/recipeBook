import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert/alert.component";
import { PlaceholderDirective } from "../Shared/placeholder/placeholder.directive";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthorizationComponent implements OnDestroy{

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  isLogin: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  authObs: Observable<any>
  closeSub: Subscription;

  // ComponentFactoryResolver is used to add component programmatically
  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  submitAuthForm(form: NgForm) {
    if (form.invalid) {
      return
    }

    this.isLoading = true;
    if (this.isLogin) {
      this.authObs = this.authService.signIn(form.value.email, form.value.password);
    }
    else {
      this.authObs = this.authService.signUp(form.value.email, form.value.password)
    }

    this.authObs.subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errMsg => {
      console.log(errMsg);
      this.error = errMsg;
      this.showErrorAlert(errMsg);
      this.isLoading = false;
    })

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errorMsg){
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostComponentRef = this.alertHost.viewContainerRef;
    hostComponentRef.clear();
    // using createComponent we have created the component programmatically
    const compRef = hostComponentRef.createComponent(alertComponentFactory);
    compRef.instance.message = errorMsg;
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostComponentRef.clear();
    })
  }

  ngOnDestroy() {
    if (this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}

