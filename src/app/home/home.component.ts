import {Component, ViewChild} from '@angular/core';
import {UserStorageService} from "../_services/user-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../_interfaces/user";
import {HomeService} from "./_services/home.service";
import {LoadingController, PopoverController} from "@ionic/angular";
import { Photo, Photos} from "./_interfaces/flickr_photos";
import {SearchComponent} from "./search/search.component";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent {
    public userInfo: User;
    public flickrPhotos: Photos;
    public photos: Photo[];
    public loadedLn: number = 0;
    public search: string;
    public page: number = 1;
    public perPage: number = 30;
    public total: number;
    public list = document.getElementById('list');

    constructor(private userStorageService: UserStorageService,
                public loadingController: LoadingController,
                public popoverController: PopoverController,
                private homeService: HomeService,
                private route: ActivatedRoute,
                private router: Router) {
        this.userInfo = userStorageService.getUserAuthInfo;
        this.getPhotos(true)
    }
    async loadData(event) {
        if (this.loadedLn == this.total) {
            event.target.disabled = true;
        }
        this.page++;
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
            await this.route.queryParams.subscribe(params => {
                this.search = params.search ? params.search : 'lamborghini'
            });
        }
        this.homeService.searchPhotos(this.search, this.page, this.perPage).subscribe((resp) => {
            this.flickrPhotos = resp.photos;
            this.loadedLn = resp.photos.perpage;
            this.total = +resp.photos.total;
            if (isNew){
                this.photos = resp.photos.photo;
                this.dismissLoading().then(() => {});
            } else {
                resp.photos.photo.map(i => {
                    this.photos.push(i)
                })
            }
        })

    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'please wait...',
        });
        await loading.present();
    }

    async dismissLoading() {
        const loading = await this.loadingController.dismiss({});
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: SearchComponent,
            event: ev,
            translucent: true,
            componentProps: {search: this.search},
        })
        await popover.present();
        await popover.onDidDismiss().then(() => {
            this.getPhotos(true)
        })
    }

}
