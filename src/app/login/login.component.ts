import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface Utilisateur {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  code: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // propriétés de la classe
  utilisateursCollection: AngularFirestoreCollection<Utilisateur> | null = null;
  utilisateurs: Observable<Utilisateur[]> | null = null;
  telephone: string = '';
  code: string = '';
  message: string = '';

  constructor(public db: AngularFirestore, private router: Router) {}

  ngOnInit() {
    // on récupère la liste des utilisateurs
    this.utilisateursCollection = this.db.collection('utilisateurs');
    this.utilisateurs = this.utilisateursCollection.valueChanges();
  }

  // on vérifie les informations saisies pour se connecter
  logIn(telephone: string, code: string) {
    if (localStorage.getItem('utilisateurId')) {
      this.message = 'Vous êtes déjà connecté.';
      return;
    }
    // on recherche dans la collection des utilisateurs si le téléphone et le code appartient à un utilisateur
    this.db
      .collection('utilisateurs', (ref) =>
        ref.where('telephone', '==', telephone).where('code', '==', code)
      )
      .get()
      .subscribe((querySnapshot) => {
        // on vérifie qu'un document a été trouvé
        if (querySnapshot.docs.length === 0) {
          this.message =
            'Erreur de connexion, vérifier vos informations de connexion.';
          return;
        } else {
          //on récupére l'id du document trouvé
          const utilisateurId = querySnapshot.docs[0].id;
          this.message = 'Vous êtes bien connecté!';
          // on vide les champs
          this.viderChamps();
          //on stocke l'id de l'utilisateur avec localStorage afin de persister cette donnée
          localStorage.setItem('utilisateurId', utilisateurId);
          // on redirige vers la page d'accueil
          this.router.navigate(['/home']);
        }
      });
  }

  // fonction pour vider les champs
  viderChamps() {
    this.telephone = '';
    this.code = '';
  }
}
