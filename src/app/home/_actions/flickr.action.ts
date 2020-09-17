import {RequestParams} from "../_interfaces/flickr_photos";

export class SearchFlickr {
    static readonly type = '[Flickr] Search';
    constructor(public reqParams: RequestParams) {}
}

export class LoadFlickr {
    static readonly type = '[Flickr] Load';
    constructor(public reqParams: RequestParams) {}
}