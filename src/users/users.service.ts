import {Injectable} from '@nestjs/common'
import {User} from './user.model'
import {Post} from './post.model'
@Injectable()
export class UserService {
    allUsers: User[] = [];
    currUser : User = null;

    createNewUser(newUsername : string) {
        if (this.allUsers.length == 0) {
            const newUser = new User(newUsername);
            this.currUser = newUser;
            this.allUsers.push(newUser);
            return true
        } else {
            var isUsernameTaken : Boolean = false;
            this.allUsers.forEach(user => {
                if (user.username == newUsername) {
                    isUsernameTaken = true;
                }
            });

            if (!isUsernameTaken) {
                const newUser = new User(newUsername);
                this.allUsers.push(newUser);
                this.currUser = newUser;
                return true
            } else {
                return false
            }
        } 
    }

    postTweet(username : string, tweet : string) {

        if (this.findUserByName(username) && this.currUser.username == username) {
            var postId = this.currUser.allUserPosts.length + 1;
            const newPost = new Post(tweet, postId);
            this.currUser.allUserPosts.push(newPost);
            return true;
        }

        return false;
    }

    userSignIn(username : string) {
        if (this.findUserByName(username) && this.currUser == null) {
            this.allUsers.forEach( user => {
                if (user.username == username) {
                    this.currUser = user;
                }
            })
            return true;
        }
        return false;
    }

    userSignOut(username : string) {
        if (this.findUserByName(username) && this.currUser != null) {
            this.currUser = null;
            return true;
        }
        return false;
    }

    private findUserByName (username : string) {
        var isUsernameInDb = false;
        this.allUsers.forEach( user => {
            if (user.username == username) {
                isUsernameInDb = true;
            }
        })
        return isUsernameInDb;
    }

}