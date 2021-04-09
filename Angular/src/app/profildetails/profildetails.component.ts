import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
@Component({
  selector: 'app-profildetails',
  templateUrl: './profildetails.component.html',
  styleUrls: ['./profildetails.component.css']
})
export class ProfildetailsComponent implements OnInit {
  user: Observable<String>;
  profil;
  message = "";
  constructor(private route: ActivatedRoute,private router: Router,private authService: AuthentificationService) { 
    this.user = this.authService.getUser();
    this.profil = this.authService.getAmi();
    }

  ngOnInit(): void {
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
      this.authService.AddFriend(addedfriend).subscribe((resultats) => {
      this.message = resultats['message'] 
      this.router.navigate(['/myfriends']);
      })

  }
}
