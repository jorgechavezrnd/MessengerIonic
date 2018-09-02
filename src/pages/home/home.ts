import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User, Status } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any = [];
  query: string;
  status: Status;
  user: User;

  constructor(public navCtrl: NavController, public userService: UserService, 
              private alertController: AlertController, private authService: AuthService,
              private requestService: RequestService, public toastController: ToastController) {
    const usersObservable = this.userService.get();
    usersObservable.valueChanges().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users);
    }, (error) => {
      alert('Ocurrió un error');
      console.log(error);
    });
    this.authService.getStatus().subscribe((session) => {
      if (!session) {
        return;
      }
      if (!session.uid) {
        return;
      }
      this.userService.getById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.user.friends = Object.keys(this.user.friends).map(key => this.user.friends[key]);
        console.log(this.user);
      }, (error) => {
        console.log(error);
      })
    }, (error) => {
      console.log(error);
    })
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  sendRequest() {
    const prompt = this.alertController.create({
      title: 'Agregar amigo',
      message: 'Ingresar email del amigo para agregar',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log(data);
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            const request = {
              timestamp: Date.now(),
              receiver_email: data.email,
              sender: this.user,
              status: 'pending'
            };
            this.requestService.createRequest(request).then((data) => {
              let toast = this.toastController.create({
                message: 'Solicitud Enviada',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }).catch((error) => {
              console.log(error);
            })
          }
        }
      ]
    });
    prompt.present();
  }

}
