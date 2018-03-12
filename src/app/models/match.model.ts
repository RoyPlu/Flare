export class Match {
    _id: string;
    participants: string[];

    constructor(_id: string, participants: string[]) {
        this._id = _id;
        this.participants = participants;
    }
}

export class Matches {
    _id: string;

    constructor(_id: string) {
        this._id = _id;
    }
}