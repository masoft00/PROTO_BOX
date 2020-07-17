import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {
  constructor(private http: HttpClient) { }
  baseurl: string = "http://127.0.0.1:3000/";
  sendMessage(data) {
    return this.http.post<any>(this.baseurl+'sendmail',data);
  }
}

