import { UserService } from 'src/app/services/users/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm && this.loginForm.valid) {
      this.login();
    } else {
      console.error('Le formulaire de connexion est null ou invalide.');
    }
  }

  login() {
    if (this.loginForm) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      if (email !== null && password !== null) {
        // Continuer avec le processus de connexion
        this.userService.connexion(email, password).subscribe(
          (response: any) => {
            // Si la connexion est réussie, redirige vers le tableau de bord
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            // En cas d'échec de la connexion, gérer l'erreur
            console.error('Erreur de connexion:', error);
            alert("erre")

            // Afficher le contenu de la réponse d'erreur
            console.log('Contenu de la réponse d\'erreur:', error.error);

            // Afficher un message d'erreur spécifique en fonction du type d'erreur
            // this.errorMessage = this.extractErrorMessage(error);
          }
        );
      } else {
        console.error('Les valeurs email et password sont nulles.');
      }
    } else {
      console.error('Le formulaire de connexion est null.');
    }
  }

}
