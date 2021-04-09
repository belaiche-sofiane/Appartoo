import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-mon-profile',
  templateUrl: './mon-profile.component.html',
  styleUrls: ['./mon-profile.component.css']
})
export class MonProfileComponent implements OnInit {
  user: Object;
  profile : Object[] = new Array();;
  constructor(private route: ActivatedRoute, private router: Router,private authService: AuthentificationService) {
  this.user= this.authService.getUser(); }

ngOnInit(): void {
  this.authService.getProfile(this.user['_value']).subscribe((profile : any) =>{
  this.profile = profile;
  } )
  }
}
