import {Injectable} from '@nestjs/common'
import {User} from './user.model'

@Injectable()
export class UserService {
    allUsers: User[] = [];

    createNewUser(newUsername : string) {
        if (this.allUsers.length == 0) {
            const newUser = new User(newUsername);
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
                return true
            } else {
                return false
            }
        } 
    }

}