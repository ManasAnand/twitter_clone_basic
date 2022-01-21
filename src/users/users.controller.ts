import {Controller, Post, Body, HttpException, HttpStatus, Param, Put} from '@nestjs/common'
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
            return 'Success! Created new user ' + newUserName;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Put('/login/:user') 
    login(
        @Param() params : any
    ) : any {
        const isLoginSuccessful = this.userService.userSignIn(params.user);
        if (isLoginSuccessful) {
            return 'Successfully logged in' + params.user;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Put('/logout/:user')
    logout(
        @Param() params : any
    ) : any {
        const isLogoutSuccessful = this.userService.userSignOut(params.user);
        if (isLogoutSuccessful) {
            return 'Successfully logged out' + params.user;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Post('/:user')
    tweet(
        @Param() params : any,
        @Body('tweet') tweetText : string
    ): any {
        const isPostSuccessful = this.userService.postTweet(params.user, tweetText);
        if (isPostSuccessful) {
            return 'Success! ' + params.user + ' just tweeted: ' + tweetText
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}


