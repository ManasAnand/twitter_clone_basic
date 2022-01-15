import {Controller, Post, Body, HttpException, HttpStatus} from '@nestjs/common'
import {UserService} from './users.service'

@Controller()
export class NewUserController {
    constructor (private readonly userService : UserService) {}

    @Post()
    createNewUser(
        @Body('username') newUserName : string
    ): any {
        const isUsernameValid = this.userService.createNewUser(newUserName);
        if (isUsernameValid) {
            return 'Success!'
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Post(':/user')
    tweet(
        @Body('tweet') tweetText : string
    ): any {

    }
}


