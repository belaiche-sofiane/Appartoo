import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject,BehaviorSubject, pipe} from 'rxjs';
import {Observable} from 'rxjs';

const httpOptions = {
	headers: new HttpHeaders({
		"Access-Control-Allow-Methods":"GET, POST",
		"Access-Control-Allow-Headers":"Content-type",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin":"*",
		
	})
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
    user: Subject<string>= new BehaviorSubject<string>(undefined);
    private baseURL: string="http://localhost:8888/"
    amis;
    ami:Subject<string> = new BehaviorSubject<string>(undefined);
  constructor(private http:HttpClient) { }

getUser(){
    return this.user;
}

getProfile(profile){
    return this.http.get(this.baseURL+'profile/' + profile);
}

getAllProfils(){
    return this.http.get(this.baseURL+'Allprofils');
}

getMembersProfile(id:string){
  this.getAllProfils().subscribe((profile : any) =>{
    this.amis = profile;
    const prof = this.amis.filter(ami => ami._id === id);
    this.ami.next(prof[0]);
  });
}

getFriendProfile(profil) {
  this.getFriends(profil.email).subscribe((profile : any) =>{
    this.amis = profile;
    const prof = this.amis.filter(ami => ami.id === profil.id);
    this.ami.next(prof[0]);
  });
}

getAmi(){
  return this.ami;
}

getProfil() {
    return this.user;
}

connect(data: string){
    this.user.next(data);
}

disconnect(){
    this.user.next(null);
}
VerificationConnexion(identifiants):Observable<any>{
    return this.http.post(this.baseURL +"membre/connexion",JSON.stringify(identifiants),httpOptions);
  
}
creerCompte(utilisateur): Observable<any> {
    return this.http.post('http://localhost:8888/membre',JSON.stringify(utilisateur) ,httpOptions);
  
}
update(utilisateur): Observable<any>{
    return this.http.put('http://localhost:8888/update',JSON.stringify(utilisateur) ,httpOptions );
}
  
saveProfil(data) {
    this.user = data;
}

AddFriend(friend): Observable<any>{
    return this.http.post('http://localhost:8888/addfriend',JSON.stringify(friend) ,httpOptions);
}

getFriends(user): Observable<any>{    
    return this.http.get(this.baseURL + 'myfriends/' + user)
} 

deletefriend(friend){
    return this.http.delete(this.baseURL + 'deletefriend/'+ friend);
}
getAmis(user): Observable<any>{    
  return this.http.get(this.baseURL + 'mesamis/' + user)
}


}
