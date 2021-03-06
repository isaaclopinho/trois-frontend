import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  title = "TROIS PASSAGENS ÁEREAS";

  isAuthenticated = false;  
  private userSubs : Subscription;

  
  constructor(private authService : AuthService) { }
  
  ngOnInit(): void {
    this.userSubs = this.authService.user.subscribe( user =>{
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  
  logout(){
    this.authService.logout();
  }
}
