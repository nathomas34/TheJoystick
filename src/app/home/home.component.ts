import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Utilisateur {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  code: string;
}

interface Jeu {
  nom: string;
  description: string;
  image: string;
  votes: string[];
  createur: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // propriétés de la classe
  utilisateursCollection: AngularFirestoreCollection<Utilisateur> | null = null;
  utilisateurs: Observable<Utilisateur[]> | null = null;
  jeuxCollection: AngularFirestoreCollection<Jeu> | null = null;
  jeux: Observable<any[]> | null = null;
  estConnecte: boolean = false;
  constructor(public db: AngularFirestore) {}

  ngOnInit() {
    // on récupère la liste des utilisateurs
    this.utilisateursCollection = this.db.collection('utilisateurs');
    this.utilisateurs = this.utilisateursCollection.valueChanges();
    // on récupère la liste des jeux avec les ids associés
    this.jeuxCollection = this.db.collection('jeux');
    this.jeux = this.jeuxCollection.valueChanges({ idField: 'idJeu' });
    // on récupére l'id de l'utilisateur connecté avec localStorage
    const utilisateurId = localStorage.getItem('utilisateurId');
    // on vérifie si l'utilisateur est connecté
    if (utilisateurId != null) {
      // on met la variable à true pour dire qu'on est connecté
      this.estConnecte = true;
      this.db
        .collection('utilisateurs', (ref) =>
          ref.where('id', '==', utilisateurId)
        )
        .get()
        .subscribe((querySnapshot) => {
          // on vérifie qu'un document a été trouvé
          if (querySnapshot.docs.length === 0) {
            return;
          }
        });
    }
  }

  // fonction pour récupérer tous les jeux
  getJeux() {
    this.jeux = this.db.collection('jeux').valueChanges();
  }

  // fonction pour se déconnecter
  logOut() {
    // on supprime l'id de l'utilisateur du localStorage
    localStorage.removeItem('utilisateurId');
    // on rafraîchit la page
    window.location.reload();
  }
}
