// This is a Declaration file: https://medium.com/jspoint/typescript-type-declaration-files-4b29077c43
interface User {
    _id: string
    userName: string;
    profilePicture: string;
    nPosts: number;
    nFollowers: number;
    nFollowing: number;
    ownPosts: Post[];
}