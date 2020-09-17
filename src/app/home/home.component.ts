import {Component} from '@angular/core';
import {LoadingController, PopoverController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngxs/store";

import {UserStorageService} from "../_services/user-storage.service";
import {User} from "../_interfaces/user";
import {Photos, RequestParams} from "./_interfaces/flickr_photos";
import {SearchComponent} from "./search/search.component";
import {SearchFlickr, LoadFlickr} from "./_actions/flickr.action";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent {
    public userInfo: User;
    public flickrPhotos: Photos;

    private searchValues = ['lamborghini', 'ferrari', 'audi', 'nature', 'qwerty', 'AI', 'IT']

    private loadedLn: number = 0;

    public reqParams: RequestParams = {
        text: '',
        page: 1,
        perPage: 5
    }
    private total: number;

    constructor(private userStorageService: UserStorageService,
                public loadingController: LoadingController,
                public popoverController: PopoverController,
                private store: Store,
                private route: ActivatedRoute,
                private router: Router) {
        this.userInfo = userStorageService.getUserAuthInfo;
        this.getPhotos(true)
    }
    async loadData(event) {
        if (this.loadedLn == this.total) {
            event.target.disabled = true;
        }
        this.reqParams.page++;
        await this.getPhotos(false)
        await event.target.complete();
    }
    logout() {
        this.userStorageService.removeFromLocalStorageUserInfo()
        this.router.navigate(['/auth'])
    }

    async getPhotos(isNew: boolean) {
        if (isNew){
            this.presentLoading().then(() => {});
            await this.getQueryParams();
            this.store.dispatch(new SearchFlickr(this.reqParams)).subscribe((resp) => {
                this.flickrPhotos = resp.photos;
                this.loadedLn = this.flickrPhotos.photo.length;
                this.total = +this.flickrPhotos.total;
                this.dismissLoading().then(() => {});
            });
        } else {
            this.store.dispatch(new LoadFlickr(this.reqParams)).subscribe((resp) => {
                this.flickrPhotos = resp.photos;
                this.loadedLn = this.flickrPhotos.photo.length;
                this.total = +this.flickrPhotos.total;
            });
        }
    }

    getQueryParams() {
        this.route.queryParams.subscribe(params => {
            this.reqParams.text = params.search ? params.search : this.getRandomValue()
        });
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'please wait...',
        });
        await loading.present();
    }

    async dismissLoading() {
        await this.loadingController.dismiss({});
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: SearchComponent,
            event: ev,
            translucent: true,
            componentProps: {search: this.reqParams.text},
        })
        await popover.present();
        await popover.onDidDismiss().then(() => {
            this.route.queryParams.subscribe(params => {
                if (params.search && this.reqParams.text !== params.search){
                    this.getPhotos(true)
                }
            });
        })
    }

    doRefresh(event) {
        this.getPhotos(true).then(() => {
            event.target.complete();
        })
    }

    private getRandomValue():string {
        const random = Math.floor(Math.random() * this.searchValues.length);
        return this.searchValues[random]
    }
}
