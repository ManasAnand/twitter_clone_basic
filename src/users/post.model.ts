export class Post {
    constructor(
         public tweet : string,
         public tweetId : number,
         public numOfLikes: number = 0

    ) {}
}