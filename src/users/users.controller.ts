import {Controller, Post, Body, HttpException, HttpStatus, Param, Put, Get} from '@nestjs/common'
import { brotliDecompress } from 'zlib';
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
        console.log(JSON.stringify(this.userService.allUsers))
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
        console.log(JSON.stringify(this.userService.allUsers))

        if (isLoginSuccessful) {
            return 'Successfully logged in ' + params.user;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Put('/logout/:user')
    logout(
        @Param() params : any
    ) : any {
        const isLogoutSuccessful = this.userService.userSignOut(params.user);
        console.log(JSON.stringify(this.userService.allUsers))
        if (isLogoutSuccessful) {
            return 'Successfully logged out ' + params.user;
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
        console.log(JSON.stringify(this.userService.allUsers))

        if (isPostSuccessful) {
            return 'Success! ' + params.user + ' just tweeted: ' + tweetText
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Get(':/user/feed')
    getAllUserTweets(@Param() params : any) : any {
        const isUsernameInDb = this.userService.getAllTweets(params.user);
        if (isUsernameInDb) {
            return isUsernameInDb
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Put(':/user/feed') 
    likeUserTweet(
        @Param() params : any,
        @Body('tweedId') tweetId : number
    ): any {
        const isLikeTweetSuccessful = this.userService.likeUserTweet(params.user, tweetId);
        if (isLikeTweetSuccessful) {
            return this.userService.currUser + " just liked a tweet!"
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}


