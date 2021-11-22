// This is a Declaration file: https://medium.com/jspoint/typescript-type-declaration-files-4b29077c43
interface PostUser {
    id: string
    userName: string;
    email: string;

    profileAudio: string;
    profilePicture: string;
}
interface Like {
    _id: string;
    userId: string;
    userName: string;
}
interface Post {
    _id: string;
    hashtags: string[];
    audio: string;
    user: PostUser;
    commentsCount: number;
    // Javascript moment
    created_at: string;
    likes: number;
    likedByUsers: Like[];
    __v:number;
    inReplyToUser: string | null;
  }