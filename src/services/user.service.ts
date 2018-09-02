import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()

export class UserService {
    
    constructor(private angularFireDatabase: AngularFireDatabase, 
                private angularFireStorage: AngularFireStorage) {
    }

    get() {
        return this.angularFireDatabase.list('/users/');
    }

    getById(id) {
        return this.angularFireDatabase.object('/users/' + id);
    }

    add(user: User) {
        return this.angularFireDatabase.object('/users/' + user.uid).set(user);
    }

    edit(user: User) {
        return this.angularFireDatabase.object('/users/' + user.uid).set(user);
    }

    uploadPicture(picture_name, image) {
        return this.angularFireStorage.ref('pictures/' + picture_name).putString(image, 'data_url');
    }

    getDownloadURL(picture_name) {
        return this.angularFireStorage.ref('pictures/' + picture_name).getDownloadURL();
    }

    addFriend(uid, friendId) {
        this.angularFireDatabase.object('users/' + uid + '/friends/' + friendId).set(friendId);
        return this.angularFireDatabase.object('users/' + friendId + '/friends/' + uid).set(uid);
    }

}