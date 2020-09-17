import {Injectable} from "@angular/core";

import {State, Action, StateContext} from '@ngxs/store';
import {Photos} from "../_interfaces/flickr_photos";

import {SearchFlickr, LoadFlickr} from "../_actions/flickr.action";

import {HomeService} from "../_services/home.service";
import {tap} from 'rxjs/operators';


@State<Photos>({
    name: 'photos',
    defaults: {
        page: null,
        perpage: null,
        photo: []
    }
})
@Injectable()
export class FlickrState {

    constructor(private homeService: HomeService) {
    }

    @Action(SearchFlickr)
    getFlickrPhotos({getState, setState}: StateContext<Photos>, {reqParams}: SearchFlickr) {
        return this.homeService.searchPhotos(reqParams).pipe(
            tap((resp) => {
                const state = getState();
                resp.photos.photo = resp.photos.photo.filter(i => i.url_c);
                setState({...state, ...resp.photos});
            })
        )
    }

    @Action(LoadFlickr)
    loadMorePhotos({getState, patchState}: StateContext<Photos>, {reqParams}: LoadFlickr) {
        return this.homeService.searchPhotos(reqParams).pipe(tap((result) => {
            const state = getState();
            patchState({
                photo: [...state.photo, ...result.photos.photo],
                page: result.photos.page
            });
        }));
    }
}