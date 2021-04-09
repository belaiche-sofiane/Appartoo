import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthentificationService} from './authentification.service';
import {FormsModule }  from '@angular/forms'; 
import {HttpClientModule }  from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProfilComponent } from './profil/profil.component';
import { MonProfileComponent } from './mon-profile/mon-profile.component';
import { ProfildetailsComponent } from './profildetails/profildetails.component';
import { FriendsComponent } from './friends/friends.component';
import { HomeComponent } from './home/home.component';
import { AddfriendComponent } from './addfriend/addfriend.component';





@NgModule({
  declarations: [
    AppComponent,
  
    MenuComponent,
    
    ConnexionComponent,
    InscriptionComponent,
    
    AccueilComponent,
    
    ProfilComponent,
    
    MonProfileComponent,
    
    ProfildetailsComponent,
    
    FriendsComponent,
    
    HomeComponent,
    
    AddfriendComponent,
   
  
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
