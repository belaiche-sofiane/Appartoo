import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  message:string="" 
  user: Observable<string>;
  friends : Object[] = new Array();;
  amis : Object[] = new Array();;
  friend : Object[] = new Array();;
  constructor(private authService: AuthentificationService,private router: Router) { 
    this.user = this.authService.getUser();
    }

ngOnInit(): void {
    this.authService.getFriends(this.user['_value'] ).subscribe(friend =>{
    this.friends = friend;
  
  } )
    this.authService.getAmis(this.user['_value']).subscribe(ami => {
    this.amis = ami;
    
    })
    
  }
getProfilDetails(profil) {
    this.authService.getFriendProfile(profil);
    this.router.navigate(['/profildetails']);
    
  }

Delete(friend){
    this.authService.deletefriend(friend).subscribe(produit=>{
    this.authService.getFriends(this.user['_value']).subscribe((friend) => {
    this.friends = friend;

  });
})
    
    
   }
  
}
