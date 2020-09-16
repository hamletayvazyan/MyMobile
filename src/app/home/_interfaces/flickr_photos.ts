export interface Flickr_photos {
    stat: string;
    photos: Photos
}

export interface Photos {
    page: number;
    pages: number;
    perpage: number;
    photo: Photo[];
    total: string
}

export interface Photo {
    farm: number;
    height_c: number;
    id: string;
    isfamily: number;
    isfriend: number;
    ispublic: number;
    owner: string;
    ownername: string;
    secret: string;
    server: string;
    title: string;
    url_c: string;
    width_c: number;
}