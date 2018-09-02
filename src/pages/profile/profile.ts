import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User;
  pictureId: any;
  location: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private authService: AuthService, private userService: UserService,
              private camera: Camera, private toastCtrl: ToastController,
              private geolocation: Geolocation, private httpClient: HttpClient) {
    this.authService.getStatus().subscribe((data) => {
      if (!data) {
        return;
      }
      if (!data.uid) {
        return;
      }
      this.userService.getById(data.uid).valueChanges().subscribe((user: any) => {
        this.user = user;
        console.log(this.user);
      }, (error) => {
        console.log(error);
      })
    }, (error) => {
      console.log(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  saveData() {
    this.userService.edit(this.user).then((data) => {
      alert('Usuario editado');
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }

  async takePicture(source) {
    try {
      let cameraOptions: CameraOptions = {
        quality: 50,
        targetWidth: 800,
        targetHeight: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true
      };
      cameraOptions.sourceType = (source == 'camera') ? this.camera.PictureSourceType.CAMERA : 
                                                        this.camera.PictureSourceType.PHOTOLIBRARY;
      const result = await this.camera.getPicture(cameraOptions);
      const image = 'data:image/jpeg;base64,' + result;
      this.pictureId = Date.now();
      this.userService.uploadPicture(this.pictureId + '.jpg', image).then((data) => {
        this.userService.getDownloadURL(this.pictureId + '.jpg').subscribe((url) => {
          this.user.avatar = url;
          let toast = this.toastCtrl.create({
            message: 'Foto subida',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }, (error) => {
          console.log(error);
        })
      }).catch((error) => {
        console.log(error);
      });
    } catch(e) {
      console.error(e);
    }
  }

  getLocation() {
    console.log('ok');
    this.geolocation.getCurrentPosition().then((response) => {
      console.log(response);
      this.location = response;
      this.httpClient.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' 
                          + this.location.coords.latitude + ',' 
                          + this.location.coords.longitude + '&sensor=true').subscribe((data) => {
                            console.log(data);
                            console.log("Address: ", data["results"][0]["formatted_address"]);
                            this.user.address = data["results"][0]["formatted_address"];
                          }, (error) => {
                            console.log(error);
                          });
    }).catch((error) => {
      console.log(error);
    })
  }

}
