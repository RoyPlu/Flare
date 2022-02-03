export class Profile {
    _id: string;
    name: string;
    bio: string;
    photos: any;
    photo_optimizer_enabled: boolean;
    pos: string[];
    instagram: any;
    distance_mi: any;
    schools: any;
    spotify_theme_track: any;

    

    constructor(_id: string, name: string, bio: string, photos: string[], photo_optimizer_enabled: boolean, pos: string[], instagram: any, distance_mi: any, schools: any, spotify_theme_track: any) {

        this._id = _id;
        this.name = name;
        this.bio = bio;
        this.photos = photos;
        this.photo_optimizer_enabled = photo_optimizer_enabled;
        this.pos = pos;
        this.instagram = instagram;
        this.distance_mi = distance_mi;
        this.schools = schools;
        this.spotify_theme_track = spotify_theme_track;
    }
}