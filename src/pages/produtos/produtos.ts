import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  itens: ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
  ) {}

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.itens = response['content'];
        this.loadImageUrls();
      },

      error => {

      });
  }

  loadImageUrls() {
    for (let i = 0; i < this.itens.length; i++) {
      let item = this.itens[i];
      this.produtoService.getSmallImage(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.baseUrl}/produtos/picture/show/prod${item.id}.jpg`;
        },

        error => {

        });
    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id });
  }

}
