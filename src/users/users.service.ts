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
        if (this.findUserByName(username) && this.currUser.username == username) {
            this.currUser = null;
            return true;
        }
        return false;
    }

    getAllTweets(username : string) {
        if (this.findUserByName(username)) {
            this.allUsers.forEach( user => {
                if (user.username == username) {
                    return JSON.stringify(user.allUserPosts);
                }
            })
        } else {
            return false;
        }  
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

    likeUserTweet(usernameOfLiked : string, postIdOfLikedTweet : number) {
        if (this.currUser == null) {
            return false
        } else {            
            if (this.findUserByName(usernameOfLiked)) {
                this.allUsers.forEach( user => {
                    if (user.username == usernameOfLiked) {
                        var tempUser = user;
                        tempUser.allUserPosts.forEach(posts => {
                            if (posts.tweetId == postIdOfLikedTweet) {
                                this.currUser.allUserLikedPosts.forEach(currUserLikedPosts => {
                                    if (currUserLikedPosts == posts){
                                        return false;
                                    }
                                })
                                this.currUser.allUserLikedPosts.push(posts);
                                posts.numOfLikes += 1;
                            }
                        })
                    }
                })
            }
        }
        return true;
    }

}