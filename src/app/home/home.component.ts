import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

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
  votants: string[];
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
  jeuxPopulaires: Observable<any[]> | null = null;
  utilisateurId: string | null = null;
  constructor(public db: AngularFirestore) {}

  ngOnInit() {
    // on récupère la liste des utilisateurs
    this.utilisateursCollection = this.db.collection('utilisateurs');
    this.utilisateurs = this.utilisateursCollection.valueChanges();
    // on récupère la liste des jeux avec les ids associés
    this.jeuxCollection = this.db.collection('jeux');
    this.jeux = this.jeuxCollection.valueChanges({ idField: 'idJeu' });
    // on récupère le top 5 des jeux les plus populaires c'est à dire ayant le plus de votants,
    // pour cela on récupère la liste des jeux et on trie par taille de tableau des votants de chaque jeu
    // et on ne récupère que 5 résultats maximum
    this.jeuxPopulaires = this.db
      .collection('jeux')
      .valueChanges()
      .pipe(
        map((jeux: any[]) => {
          return jeux
            .sort(
              (a, b) =>
                (b.votants.length as number) - (a.votants.length as number)
            )
            .slice(0, 5);
        })
      );
    // on récupére l'id de l'utilisateur connecté avec localStorage
    this.utilisateurId = localStorage.getItem('utilisateurId');
    // on vérifie si l'utilisateur est connecté
    if (this.utilisateurId != null) {
      this.db
        .collection('utilisateurs', (ref) =>
          ref.where('id', '==', this.utilisateurId)
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

  // fonction pour se déconnecter
  logOut() {
    // on supprime l'id de l'utilisateur du localStorage
    localStorage.removeItem('utilisateurId');
    // on rafraîchit la page
    window.location.reload();
  }
}
