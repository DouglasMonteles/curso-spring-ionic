import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  itens: CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService,
  ) {}

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.itens = cart.itens;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (let i = 0; i < this.itens.length; i++) {
      let item = this.itens[i];
      this.produtoService.getSmallImage(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.baseUrl}/produtos/picture/show/prod${item.produto.id}.jpg`;
        },

        error => {

        });
    }
  }

  removeItem(produto: ProdutoDTO): void {
    this.itens = this.cartService.removeProduto(produto).itens;
  }

  increaseQuantity(produto: ProdutoDTO): void {
    this.itens = this.cartService.increaseQuantity(produto).itens;
  }

  decreaseQuantity(produto: ProdutoDTO): void {
    this.itens = this.cartService.decreaseQuantity(produto).itens;
  }

  total(): number {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.setRoot('CategoriasPage');
  }

}
