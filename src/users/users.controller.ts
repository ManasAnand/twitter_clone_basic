import {Controller, Post, Body, HttpException, HttpStatus, Param} from '@nestjs/common'
import {UserService} from './users.service'

// Controller for Users. Default URL pathway.
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

    @Post('/:user')
    tweet(
        @Param() params,
        @Body('tweet') tweetText : string
    ): any {
        const isPostSuccessful = this.userService.p
    }
}


