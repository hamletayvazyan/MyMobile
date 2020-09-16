import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const apiUrl = 'http://api.zippopotam.us';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }

  public getDefault() {
    return this.httpClient.get<any>(`${apiUrl}/IT/00010`)
  }

  public getSelected(countryCode: string, zipCode: number) {
    return this.httpClient.get<any>(`${apiUrl}/${countryCode}/${zipCode}`)
  }

  searchPhotos() {
    return this.httpClient.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b39e96875f902cab2c805a14ee49ee2f&text=qwerty&format=json&nojsoncallback=1`);
  }
}
