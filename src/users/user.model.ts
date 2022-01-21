import {Post} from './post.model'

export class User {
    constructor(
        public username : string,
        public allUserPosts : Post[] = [],
        public allUserLikedPosts : Post[] = []
    ){}
}