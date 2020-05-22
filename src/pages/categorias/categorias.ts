import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  itens: CategoriaDTO[];
  baseUrl: string = API_CONFIG.baseUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService
  ) {}

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe((response) => {
          this.itens = response;
        },
        (error) => {});
  }

  showProdutos(): void {
    this.navCtrl.push('ProdutosPage');
  }

}
