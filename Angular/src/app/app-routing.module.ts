import { AddfriendComponent } from './addfriend/addfriend.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {ConnexionComponent} from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MenuComponent } from './menu/menu.component';
import { ProfilComponent} from './profil/profil.component';
import {AccueilComponent }  from './accueil/accueil.component';
import {MonProfileComponent} from './mon-profile/mon-profile.component'
import {ProfildetailsComponent} from './profildetails/profildetails.component';
import {FriendsComponent} from './friends/friends.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
 

 
 {path:'membre/connexion', component: ConnexionComponent},
{path:'inscription',component:InscriptionComponent},
{path:'monprofil', component:MonProfileComponent} ,
{path:'profil', component:ProfilComponent} ,
{path:'accueil', component:AccueilComponent} ,
{path:'profildetails', component:ProfildetailsComponent} ,
{path:'myfriends', component:FriendsComponent} ,
{path:'home', component:HomeComponent} ,
{path:'addfriend', component:AddfriendComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
