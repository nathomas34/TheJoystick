import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

interface Jeu {
  nom: string;
  description: string;
  image: string;
  votants: string[];
  createur: string;
}
@Component({
  selector: 'app-fichetech',
  templateUrl: './fichetech.component.html',
  styleUrls: ['./fichetech.component.css'],
})
export class FichetechComponent implements OnInit {
  // propriétés de la classe
  jeuxCollection: AngularFirestoreCollection<Jeu> | null = null;
  jeux: Observable<any[]> | null = null;
  message: string = '';
  jeuId: any | null = null;

  constructor(public db: AngularFirestore, private route: ActivatedRoute) {}

  ngOnInit() {
    // on récupère la liste des jeux avec les ids associés
    this.jeuxCollection = this.db.collection('jeux');
    this.jeux = this.jeuxCollection.valueChanges({ idField: 'id' });
    // on récupère l'id de la route précédente afin d'accéder à la page détaillé d'un jeu
    this.route.paramMap.subscribe((params) => {
      this.jeuId = params.get('id');
    });
  }

  // fonction pour voter un jeu
  voter() {
    // on récupère l'id de l'utilisateur connecté
    const utilisateurId = localStorage.getItem('utilisateurId');
    // on vérifie que l'utilisateur est connecté et qu'il n'a déja pas voté
    if (utilisateurId != null) {
      // on récupère le jeu de la page courante à partir de son id
      const jeu = this.db.collection('jeux').doc(this.jeuId);
      jeu.get().subscribe((querySnapshot) => {
        // on vérifie qu'un document a été trouvé
        if (!querySnapshot.exists) {
          this.message = 'Aucun jeu trouvé';
          return;
        }
        // On récupère le document trouvé
        const data = querySnapshot.data() as Jeu;
        // on vérifie que l'utilisateur n'a pas déjà voté
        if (data.votants.includes(utilisateurId)) {
          this.message = "L'utilisateur est déjà inscrit à cet événement";
          return;
        }
        // on ajoute l'id de l'utilisateur dans la liste des votants du jeu
        data.votants.push(utilisateurId);
        // on met à jour les votants dans la base de données
        jeu.update({ votants: data.votants });
        // on indique que l'utilisateur a voté
        this.message = 'Votre vote est bien pris en compte.';
      });
    }
  }
}
