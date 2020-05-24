import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {

  constructor(public storageService: StorageService) {}

  createOrClearCart(): Cart {
    let cart: Cart = { itens: [] };
    this.storageService.setCart(cart);
    return cart;
  }

  getCart(): Cart {
    let cart: Cart = this.storageService.getCart();
    if (cart === null) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduto(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.id === produto.id); // se existir, retorna o índice, senão retorna -1

    if (position === -1) {
      cart.itens.push({ quantidade: 1, produto: produto });
    }

    this.storageService.setCart(cart);
    return cart;
  }

  removeProduto(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.id === produto.id);

    if (position !== -1) {
      cart.itens.splice(position, 1);
    }

    this.storageService.setCart(cart);
    return cart;
  }

  increaseQuantity(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.id === produto.id);

    if (position !== -1) {
      cart.itens[position].quantidade++;
    }

    this.storageService.setCart(cart);
    return cart;
  }

  decreaseQuantity(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.id === produto.id);

    if (position !== -1) {
      cart.itens[position].quantidade--;

      if (cart.itens[position].quantidade < 1) {
        cart = this.removeProduto(produto);
      }

    }

    this.storageService.setCart(cart);
    return cart;
  }

  total(): number {
    let cart: Cart = this.getCart();
    let sum: number =  0;

    cart.itens.forEach(element => {
      sum += element.produto.preco * element.quantidade;
    });

    return sum;
  }
}
