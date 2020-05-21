import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { CidadeDTO } from "../../models/cidade.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class CidadeService {

  constructor(public httpClient: HttpClient) {}

  findAll(estado_id: string): Observable<CidadeDTO[]> {
    return this.httpClient.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
  }

}
