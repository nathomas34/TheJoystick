import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  utilisateursCollection: AngularFirestoreCollection<any> | null = null;
  utilisateurs: Observable<any[]> | null = null;
  telephone: string = '';
  code: string = '';
  message: string = '';
  
  constructor(public db: AngularFirestore) { }

  ngOnInit() {
    this.utilisateursCollection = this.db.collection('utilisateurs');
    this.utilisateurs = this.utilisateursCollection.valueChanges();
  }

  // on vérifie les informations saisies pour se connecter
  verifierInfos(telephone: string, code:string) {
    // on recherche dans la collection des utilisateurs si le téléphone et le code appartient à un utilisateur
    this.db.collection('utilisateurs', ref =>
      ref.where('telephone', '==', telephone).where('code', '==', code)).get().subscribe((querySnapshot) => {
      // on vérifie qu'un document a été trouvé
      if (querySnapshot.docs.length === 0) {
        this.message = 'Erreur de connexion, vérifier vos informations de connexion.';
        return;
      }
      else {
        this.message = 'Vous êtes bien connecté!';
      }
    });  
  }
}
