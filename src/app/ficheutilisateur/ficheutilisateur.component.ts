import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
interface Utilisateur {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  code: string;
}
@Component({
  selector: 'app-ficheutilisateur',
  templateUrl: './ficheutilisateur.component.html',
  styleUrls: ['./ficheutilisateur.component.css'],
})
export class FicheutilisateurComponent implements OnInit {
  // propriétés de la classe
  utilisateursCollection: AngularFirestoreCollection<Utilisateur> | null = null;
  utilisateurs: Observable<any[]> | null = null;
  nom: string = '';
  prenom: string = '';
  telephone: string = '';
  email: string = '';
  code: string = '';
  message: string = '';
  utilisateurId: string | null = null;
  utilisateurModifie: Utilisateur | null = null;
  constructor(public db: AngularFirestore, private route: ActivatedRoute) {}

  ngOnInit() {
    // on récupère la liste des utilisateurs
    this.utilisateursCollection = this.db.collection('utilisateurs');
    this.utilisateurs = this.utilisateursCollection.valueChanges({
      idField: 'id',
    });
    // on récupère l'id de la route précédente afin d'accéder à la page détaillé d'un utilisateur
    this.route.paramMap.subscribe((params) => {
      this.utilisateurId = params.get('id');
    });
  }

  // fonction pour modifier un utilisateur
  modifierUtilisateur(utilisateurModifie: Utilisateur) {
    // on récupère l'id de l'utilisateur connecté
    const idUtilisateur = localStorage.getItem('utilisateurId');
    if (idUtilisateur != null) {
      // on récupère l'utilisateur à partir de son id
      const utilisateur = this.db.collection('utilisateurs').doc(idUtilisateur);
      utilisateur.get().subscribe((querySnapshot) => {
        // on vérifie qu'un document a été trouvé
        if (!querySnapshot.exists) {
          this.message = 'Aucun document trouvé';
          return;
        }
        // on vérifie si les champs ne sont pas vides à l'exception de l'email qui est facultatif
        if (
          !utilisateurModifie.nom ||
          !utilisateurModifie.prenom ||
          !utilisateurModifie.telephone ||
          !utilisateurModifie.code
        ) {
          this.message = 'Veuillez remplir les champs obligatoires.';
          return;
        }
        // on récupère les infos de l'utilisateur modifié
        const utilisateurInfos = {
          nom: utilisateurModifie.nom,
          prenom: utilisateurModifie.prenom,
          telephone: utilisateurModifie.telephone,
          email: utilisateurModifie.email,
          code: utilisateurModifie.code,
        };
        // on met à jour les infos de l'utilisateur
        utilisateur.update(utilisateurInfos);
        this.message = 'Vous avez bien modifié le jeu.';
      });
    }
  }
}
