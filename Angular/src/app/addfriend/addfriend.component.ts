import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.component.html',
  styleUrls: ['./addfriend.component.css']
})
export class AddfriendComponent implements OnInit {
  utilisateur = {
    "photo":"",
    "nom": "",
     "age":"",
     "famille":"",
     "race":"",
     "nourriture":"",
     "email": "",
      "password": "",
      "mail":"",
      
      id:Math.random().toString(36).substr(2, 9)
     };
  user:  Observable<string>;
  message: string;
  constructor(private authentificationService: AuthentificationService,
    private router : Router) {
      this.user= this.authentificationService.getUser(); 
     }

  ngOnInit(){
   
  }
onSubmit() {
    this.utilisateur.mail = this.user['_value'];
    this.authentificationService.creerCompte(this.utilisateur).subscribe(response => {
    this.message = response['messages']

    
    this.authentificationService.AddFriend(this.utilisateur).subscribe(friend => {
          console.log("ami ajouté avec succés");
    this.router.navigate['/mesamis'];
        });
      });
 
}
}
