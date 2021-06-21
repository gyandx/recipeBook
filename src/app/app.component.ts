import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project';

  constructor(private authService: AuthService){}
  // routePathName: string = 'recipe';

  // changePath(event: string){
  //   if (event === 'recipe'){
  //     this.routePathName = 'recipe';
  //   }else{
  //     this.routePathName = 'shopping'
  //   }
  // }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.autoLogin();
  }
}
