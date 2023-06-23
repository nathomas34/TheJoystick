import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Jeu {
  nom: string;
  description: string;
  image: string;
  createur: string;
  votes: string[];
}

@Component({
  selector: 'app-formcrea',
  templateUrl: './formcrea.component.html',
  styleUrls: ['./formcrea.component.css'],
})
export class FormcreaComponent implements OnInit {
  // propriétés de la classe
  jeuxCollection: AngularFirestoreCollection<Jeu> | null = null;
  jeux: Observable<Jeu[]> | null = null;
  nom: string = '';
  description: string = '';
  image: string = '';
  votes: string[] = [''];
  createur: string = '';
  message: string = '';

  constructor(public db: AngularFirestore) {}

  ngOnInit() {
    // on récupère la liste des jeux
    this.jeuxCollection = this.db.collection('jeux');
    this.jeux = this.jeuxCollection.valueChanges();
  }

  // Création d'un jeu
  creerJeu() {
    // on construit un jeu avec ses informatiions
    const jeu = {
      nom: this.nom,
      description: this.description,
      image: this.image,
      createur: this.createur,
      votes: this.votes,
    };
    // on vérifie si les champs ne sont pas vides
    if (!this.nom || !this.description || !this.image || !this.createur) {
      this.message = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    // si la collection des jeux existe, on ajoute le jeu
    if (this.jeuxCollection) {
      this.jeuxCollection.add(jeu);
      this.message = 'Le jeu a été créé avec succès.';
    } else {
      this.message = 'Erreur dans la requête.';
    }
  }
}
