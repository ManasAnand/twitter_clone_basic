import {Injectable} from '@nestjs/common'
import {User} from './user.model'

@Injectable()
export class Users {
    users: User[] = [];

    createNewUser(newUsername : string) {
        if (this.users.length == 0) {
            const newUser = new User(newUsername);
            this.users.push(newUser);
            return "Created new user successfully"
        } else {
            var isUsernameTaken : Boolean = false;
            this.users.forEach(user => {
                if (user.username == newUsername) {
                    isUsernameTaken = true;
                }
            });

            if (!isUsernameTaken) {
                const newUser = new User(newUsername);
                this.users.push(newUser);
                return "Created new user successfully"
            } else {
                return "Failed to create new user. Try again"
            }
        } 
    }

}