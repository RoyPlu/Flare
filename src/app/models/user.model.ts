export class User {
    _id: string;
    name: string;
    bio: string;
    photos: string[];
    photo_optimizer_enabled: boolean;
    pos: string[];
    user: any;
    purchase: any;
    spotify: any;

    constructor(_id: string, name: string, bio: string, photos: string[], photo_optimizer_enabled: boolean, pos: string[], user: any, purchase: any, spotify: any) {

        this._id = _id;
        this.name = name;
        this.bio = bio;
        this.photos = photos;
        this.photo_optimizer_enabled = photo_optimizer_enabled;
        this.pos = pos;
        this.user = user;
        this.purchase = purchase;
        this.spotify = spotify;
    }
}