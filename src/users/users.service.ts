import {Injectable} from '@nestjs/common'
import {User} from './user.model'

@Injectable()
export class UserService {
    allUsers: User[] = [];
    currUser : User;

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
        var isUsernameInDb = false;
        this.allUsers.forEach( user => {
            if (user.username == username && this.currUser.username == username) {
                isUsernameInDb = true;
            }
        })

        if (isUsernameInDb) {
            var postId = this.currUser.allUserPosts.length + 1;
            const newPost = new Post(tweet, postId);
        }

        return false;
    }

}