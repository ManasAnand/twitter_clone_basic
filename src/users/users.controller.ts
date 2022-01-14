import {Controller, Get, Post, Put} from '@nestjs/common'

@Controller('users')
export class UsersController {

    @Post()
    createNewUser() {
        
    }

    @Post()
    postNewTweet() {

    }

    @Get('username')
    viewAllUserTweets() {

    }

    @Put('username/tweet')
    likeUserTweet(){

    }

}



