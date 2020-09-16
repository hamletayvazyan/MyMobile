import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flickr_photos} from "../_interfaces/flickr_photos";

/*
* url to get api_key => https://www.flickr.com/services/api/explore/flickr.photos.search
*
* type something  example: qwerty in TEXT field and click the --> Call Method.. button
*
* after that you will get some URL where you have an api_key
*
* copy that key and set api_key variable value
* */
const api_key = 'b39e96875f902cab2c805a14ee49ee2f';
const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}`;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }

  searchPhotos(text: string, page: number, perPage: number): Observable<Flickr_photos> {
    return this.httpClient.get<Flickr_photos>(`${apiUrl}&text=${text}&format=json&extras=url_c,owner_name&page=${page}&per_page=${perPage}&nojsoncallback=1`);
  }
}
