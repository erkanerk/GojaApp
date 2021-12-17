// This is a Declaration file: https://medium.com/jspoint/typescript-type-declaration-files-4b29077c43
interface Profile {
    _id: string;
    userName: string;
    email: string;
    profilePicture: string;
    profileAudio: string;
    profileAudioFileType: string;
    isFollowing: boolean;
    followerCount: number;
    followingCount: number;
    postCount: number;
}