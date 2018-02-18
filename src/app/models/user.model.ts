export class User {
    _id: string;
    name: string;
    bio: string;
    photos: string[];
    photo_optimizer_enabled: boolean;
    pos: string[];

    constructor(_id: string, name: string, bio: string, photos: string[], photo_optimizer_enabled: boolean, pos: string[]) {

        this._id = _id;
        this.name = name;
        this.bio = bio;
        this.photos = photos;
        this.photo_optimizer_enabled = photo_optimizer_enabled;
        this.pos = pos;
    }
}