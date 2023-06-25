import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichetechComponent } from './fichetech/fichetech.component';
import { FormcreaComponent } from './formcrea/formcrea.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { FicheutilisateurComponent } from './ficheutilisateur/ficheutilisateur.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'fichetech/:id', component: FichetechComponent },
  { path: 'formcrea', component: FormcreaComponent },
  { path: 'ficheutilisateur/:id', component: FicheutilisateurComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
