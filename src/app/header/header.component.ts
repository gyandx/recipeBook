import { Component, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../Shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(private dataService: DataStorageService, private authService: AuthService){}

  // @Output() routeChange = new EventEmitter<string>();

  // changeRoute(routeName: string){
  //   this.routeChange.emit(routeName);
  // }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
    // console.log(this.userSub)
  }

  onSaveRecipe() {
    this.dataService.saveRecipe();
  }

  onFetchRecipe(){
    this.dataService.fetchRecipe().subscribe();
  }

  logOut(){
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
