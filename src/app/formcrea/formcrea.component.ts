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
  votants: string[];
  createur: string;
}

interface Utilisateur {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  code: string;
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
  utilisateursCollection: AngularFirestoreCollection<Utilisateur> | null = null;
  utilisateurs: Observable<Utilisateur[]> | null = null;
  nom: string = '';
  description: string = '';
  image: string = '';
  votants: string[] = [];
  createur: string = '';
  message: string = '';

  constructor(public db: AngularFirestore) {}

  ngOnInit() {
    // on récupère la liste des jeux
    this.jeuxCollection = this.db.collection('jeux');
    this.jeux = this.jeuxCollection.valueChanges();
    // on récupère la liste des utilisateurs
    this.utilisateursCollection = this.db.collection('utilisateurs');
    this.utilisateurs = this.utilisateursCollection.valueChanges();
  }

  // Création d'un jeu
  creerJeu() {
    // on récupère l'id de l'utilisateur connecté
    const utilisateurId = localStorage.getItem('utilisateurId');
    // on vérifie que l'utilisateur est connecté et qu'il n'a déja pas voté
    if (utilisateurId != null) {
      const utilisateur = this.db.collection('utilisateurs').doc(utilisateurId);
      utilisateur.get().subscribe((querySnapshot) => {
        // on vérifie qu'un document a été trouvé
        if (!querySnapshot.exists) {
          this.message = 'Aucun document trouvé';
          return;
        }
        // on vérifie si les champs ne sont pas vides
        if (!this.nom || !this.description || !this.image) {
          this.message = 'Veuillez remplir tous les champs obligatoires.';
          return;
        }
        // On récupère le document trouvé
        const data = querySnapshot.data() as Utilisateur;
        // on construit un jeu avec ses informatiions
        const jeu = {
          nom: this.nom,
          description: this.description,
          image: this.image,
          votants: this.votants,
          createur: data.prenom + ' ' + data.nom,
        };
        // on indique que l'utilisateur a voté
        this.message = 'Vous avez bien créé le jeu.';

        // si la collection des jeux existe, on ajoute le jeu
        if (this.jeuxCollection) {
          this.jeuxCollection.add(jeu);
          // on vide les champs
          this.viderChamps();
          this.message = 'Le jeu a été créé avec succès.';
        } else {
          this.message = 'Erreur dans la requête.';
        }
      });
    }
  }

  // fonction pour vider les champs
  viderChamps() {
    this.nom = '';
    this.description = '';
    this.image = '';
    this.createur = '';
  }
}
