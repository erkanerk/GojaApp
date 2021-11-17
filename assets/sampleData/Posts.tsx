const audio: PostAudio = {
    type: 'bahamasvitastränder',
    url: 'https://goja-audio.s3.eu-north-1.amazonaws.com/1636722311756'
  }
  
  const user: PostUser = {
    id: 'asdarwetrwer',
    userName: 'Sven Svensson',
    friendsCount: 1,
    profilePicture: 'https://reactnative.dev/img/tiny_logo.png',
    following: true
  }

  const hashtags: Hashtag[] = [
    {
        id: 'asdgqwerq',
        text: '#bra',
    },
    {
        id: 'qwetweryhsdfh',
        text: '#bättre',
    },
    {
        id: 'wqetsadfx',
        text: '#bäst',
    }
]
  
  export const SamplePosts: Post[] = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        audio: audio,
        user: user,
        likes: 10,
        hashtags: hashtags,
        commentsCount: 10,
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        audio: audio,
        user: user,
        likes: 101,
        hashtags: hashtags,
        commentsCount: 123,
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        audio: audio,
        user: user,
        likes: 1011,
        hashtags: hashtags,
        commentsCount: 5,
      },
    ];