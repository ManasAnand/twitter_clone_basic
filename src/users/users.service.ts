import {Injectable} from '@nestjs/common'
import {User} from './user.model'

@Injectable()
export class Users {
    users: User[] = [];

    createNewUser(newUsername : string) {
        if (this.users.length == 0) {

        } else {
            var isUsernameTaken : Boolean = false;
            this.users.forEach(user => {
                if (user.username == newUsername) {
                    isUsernameTaken = true;
                }
            });

            if (!isUsernameTaken) {
                const 
            }
        } 
    }

}