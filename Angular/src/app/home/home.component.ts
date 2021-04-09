import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: Observable<string>;
  constructor(private router : Router,private authService: AuthentificationService,) {  
    this.user = this.authService.getUser();}

ngOnInit(): void {
  this.router.navigate(['/home']);
  }

}
