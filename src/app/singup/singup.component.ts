import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

interface Utilisateur {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  code: string;
}
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent implements OnInit {
  // propriétés de la classe
  utilisateursCollection: AngularFirestoreCollection<Utilisateur> | null = null;
  utilisateurs: Observable<Utilisateur[]> | null = null;
  nom: string = '';
  prenom: string = '';
  telephone: string = '';
  email: string = '';
  code: string = '';
  message: string = '';
  constructor(public db: AngularFirestore) {}

  ngOnInit() {
    // on récupère la liste des utilisateurs
    this.utilisateursCollection = this.db.collection('utilisateurs');
    this.utilisateurs = this.utilisateursCollection.valueChanges();
  }

  // Création d'un utilisateur
  creerUtilisateur() {
    // on construit un utilisateur avec ses informatiions
    const utilisateur = {
      nom: this.nom,
      prenom: this.prenom,
      telephone: this.telephone,
      email: this.email,
      code: this.code,
    };

    // on vérifie si les champs ne sont pas vides à l'exception de l'email qui est facultatif
    if (!this.nom || !this.prenom || !this.telephone || !this.code) {
      this.message = 'Veuillez remplir les champs obligatoires.';
      return;
    }

    // si la collection des utilisateurs existe, on ajoute l'utilisateur
    if (this.utilisateursCollection) {
      this.utilisateursCollection.add(utilisateur);
      // on vide les champs
      this.viderChamps();
      this.message = "L'utilisateur a été créé avec succès.";
    } else {
      console.error('Erreur dans la requête.');
    }
  }

  // fonction pour vider les champs
  viderChamps() {
    this.nom = '';
    this.prenom = '';
    this.telephone = '';
    this.email = '';
    this.code = '';
  }
}
