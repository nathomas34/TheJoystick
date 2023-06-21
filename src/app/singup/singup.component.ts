import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";



interface Utilisateur {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  code: string;
  typeUtilisateur: string;
  
}
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})


export class SingupComponent{

  utilisateursCollection: AngularFirestoreCollection<any> | null = null;
  utilisateurs: Observable<any[]> | null = null;
  id: string = "";
  
  nom: string = '';
  prenom: string = '';
  telephone: string = '';
  email: string = '';
  code: string = '';
  typeUtilisateur: string = '';
  message: string = '';

  constructor(public db: AngularFirestore) { }

  ngOnInit() {
    this.utilisateursCollection = this.db.collection('utilisateurs');
    this.utilisateurs = this.utilisateursCollection.valueChanges();
  }
  

  creerUtilisateur() {
    

  const utilisateur = {
    
    nom: this.nom,
    prenom: this.prenom,
    telephone: this.telephone,
    email: this.email,
    code: this.code,
    typeUtilisateur: this.typeUtilisateur,

  };
  if (!this.typeUtilisateur || !this.nom || !this.prenom || !this.telephone || !this.code) {
    this.message = 'Veuillez remplir tous les champs obligatoires.';
    return;
  }

  if (this.utilisateursCollection) {
    this.utilisateursCollection.add(utilisateur);
    this.message = 'L\'utilisateur a été créé avec succès.';
    
  } else {
    console.error("Erreur dans la requête.");
  }

    

    
  }
}
