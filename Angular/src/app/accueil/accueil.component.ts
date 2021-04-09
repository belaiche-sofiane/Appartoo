import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  user:  Observable<string>;
  profile : Object[] = new Array();;
  AllProfils : Object[] = new Array();;
  message = "";
  friends : Object[] = new Array();;
  amis : Object[] = new Array();;
  nom: String="";
  constructor(private route: ActivatedRoute, private router: Router,
    private authService: AuthentificationService) {
    this.user= this.authService.getUser(); 
   }

ngOnInit(): void {
  this.authService.getAllProfils().subscribe((profile : any) =>{
  this.AllProfils = profile;}
   );
    this.authService.getFriends(this.user['_value'] ).subscribe(friend =>{
    this.friends = friend;
  
  } )
  this.authService.getAmis(this.user['_value'] ).subscribe(ami =>{
    this.amis = ami;
  
  } )
  }
    
  getProfilDetails(profil) {
    console.log(profil);
    this.authService.getMembersProfile(profil._id);
    this.router.navigate(['/profildetails']);
    
  }   
  addfriend(friend){
    let addedfriend = {
      email: this.user['_value'],
      id: Math.random().toString(36).substr(2, 9),
      nom: friend['nom'],
      famille: friend['famille'],
      photo: friend['photo'],
      race: friend['race'],
      age: friend['age'],
      nourriture: friend['nourriture'],
      
      };
      var j;
      
      this.authService.AddFriend(addedfriend).subscribe((resultats) => {
      this.message = resultats['message'] 
      
      this.router.navigate(['/myfriends']);
      })
     

  }
  search(){
    var nomm = (<HTMLInputElement>document.getElementById("search-input")).value
    if(nomm != ""){
      this.AllProfils = this.AllProfils.filter(res  =>{
      return res['nom'].toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      
      } )
     
    } 
    else if (this.nom ==""){
      this.ngOnInit();
    } 
    }
}
