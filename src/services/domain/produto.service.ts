import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ProdutoService {

  constructor(public httpClient: HttpClient) {}

  findByCategoria(categoria_id: string) {
    return this.httpClient.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

}