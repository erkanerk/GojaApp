interface PostAudio {
    type: string;
    url: string;
}
interface PostUser {
    id: string;
    userName: string;
    friendsCount: number;
    profilePicture: string;
    following: boolean;
}

interface Hashtag {
    id: string;
    text: string;
}
interface Post {
    id: string;
    hashtags: Hashtag[];
    audio: PostAudio;
    user: PostUser;
    likes: number;
    commentsCount: number;
  }