import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

  constructor(public httpClient: HttpClient, public storageService: StorageService) {}

  findEmailByEmail(email: string): Observable<ClienteDTO> {
    return this.httpClient.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }

  getImage(id: string): Observable<any> {
    let url = `${API_CONFIG.baseUrl}/clientes/picture/show/cp${id}.jpg`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  insert(obj: ClienteDTO) {
    return this.httpClient.post(
      `${API_CONFIG.baseUrl}/clientes`,
      obj,
      {
        observe: 'response',
        responseType: 'text',
      }
    );
  }

}
