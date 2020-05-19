import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

  constructor(public httpClient: HttpClient, public storageService: StorageService) {}

  findEmailByEmail(email: string): Observable<ClienteDTO> {
    let token = this.storageService.getLocalUser().token;
    let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.httpClient.get<ClienteDTO>(
      `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
      { 'headers': authHeader }
    );
  }

  getImage(id: string): Observable<any> {
    let url = `${API_CONFIG.baseUrl}/clientes/picture/view/cp${id}.jpg`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }

}
