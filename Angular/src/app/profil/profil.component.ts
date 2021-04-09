import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ActivatedRoute,Router } from '@angular/router';
import {Subject} from 'rxjs';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
user : Subject<String>;
profile =  {};

  constructor(private route: ActivatedRoute, private router: Router,private authService: AuthentificationService) { 
      this.user= this.authService.getUser();}

ngOnInit(): void {
  this.authService.getProfile(this.user['_value']).subscribe(profil =>{
  this.profile = profil;});  
  }
  
updateprofil(email) {
  this.authService.update(email).subscribe(response => {
  this.router.navigate(['/monprofil']);
});
}




  
}
