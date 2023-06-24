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
interface Jeu {
  nom: string;
  description: string;
  image: string;
  createur: string;
  votes: string[];
}
@Component({
  selector: 'app-fichetech',
  templateUrl: './fichetech.component.html',
  styleUrls: ['./fichetech.component.css'],
})
export class FichetechComponent implements OnInit {
  // propriétés de la classe
  utilisateursCollection: AngularFirestoreCollection<Utilisateur> | null = null;
  utilisateurs: Observable<Utilisateur[]> | null = null;
  jeuxCollection: AngularFirestoreCollection<Jeu> | null = null;
  jeux: Observable<any[]> | null = null;
  nom: string = '';
  description: string = '';
  image: string = '';
  createur: string = '';
  message: string = '';
  jeuId: string | null = null;
  votes: string[] = [];
  constructor(public db: AngularFirestore, private route: ActivatedRoute) {}

  ngOnInit() {
    // on récupère la liste des jeux
    this.jeuxCollection = this.db.collection('jeux');
    // on récupère aussi les ids de la collection
    this.jeux = this.jeuxCollection.valueChanges({ idField: 'id' });
    // on récupère l'id de la route précédente afin d'accéder à la page détaillé d'un jeu
    this.route.paramMap.subscribe((params) => {
      this.jeuId = params.get('id');
    });
  }
}
