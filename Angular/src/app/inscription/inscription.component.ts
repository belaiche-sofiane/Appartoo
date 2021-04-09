import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  
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
  AllProfils : Object[] = new Array();;
constructor(private authentificationService: AuthentificationService,
              private router : Router) {
                this.user= this.authentificationService.getUser(); 
               }

  ngOnInit() {
    
  }

  onSubmit() {
  this.authentificationService.VerificationConnexion(this.utilisateur).subscribe(response => {
  let resulat = response['resultat']
  if (response['resultat']==0){
      
      this.authentificationService.creerCompte(this.utilisateur).subscribe(response => {
      this.message = response['messages'];
    });
      }else{
        this.message= "ce compte existe déjà!";
      }

    }
    );
 



  }


}