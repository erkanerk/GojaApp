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

interface Post {
    id: string;
    hashtags: string[];
    audio: PostAudio;
    user: PostUser;
    likes: number;
  }