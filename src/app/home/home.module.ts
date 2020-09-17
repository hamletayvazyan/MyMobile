import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {NgxsModule} from "@ngxs/store";

import {HomeComponent} from './home.component';
import {HomePageRoutingModule} from './home-routing.module';
import {SearchComponent} from "./search/search.component";

import {FlickrState} from "./_states/flickr.state";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NgxsModule.forFeature([
            FlickrState
        ]),
        HomePageRoutingModule
    ],
    declarations: [HomeComponent, SearchComponent]
})
export class HomePageModule {
}
