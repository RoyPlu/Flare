export class Profile {
    _id: string;
    name: string;
    bio: string;
    photos: string[];

    constructor(_id: string, name: string, bio: string, photos: string[]) {

        this._id = _id;
        this.name = name;
        this.bio = bio;
        this.photos = photos;
    }
}