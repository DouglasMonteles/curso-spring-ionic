import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public localStorage: StorageService,
    public clienteService: ClienteService,
    public storageService: StorageService
  ) {}

  ionViewDidLoad() {
    let localUser = this.localStorage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findEmailByEmail(localUser.email)
        .subscribe(
          (response) => {
            this.cliente = response;
            this.getImageIfExists();
          },

          (error) => {

          }
        );
    }
  }

  getImageIfExists() {
    this.clienteService.getImage(this.cliente.id)
      .subscribe(
        response => {
          this.cliente.imageUrl = `${API_CONFIG.baseUrl}/clientes/picture/show/cp${this.cliente.id}.jpg`;
        },
        error => {

        }
    )
  }

}
