// This is a Declaration file: https://medium.com/jspoint/typescript-type-declaration-files-4b29077c43
interface Follower {
    _id: string
    userName: string;
    profilePicture: string;
    profileAudio: string;
    isMutualFollowers?: boolean;
}