const audio: PostAudio = {
    type: 'bahamasvitastränder',
    url: 'audioURL'
  }
  
  const user: PostUser = {
    id: 'asdarwetrwer',
    userName: 'Sven Svensson',
    friendsCount: 1,
    profilePicture: 'https://reactnative.dev/img/tiny_logo.png',
    following: true
  }
  
  export const SamplePosts: Post[] = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        audio: audio,
        user: user,
        likes: 10,
        hashtags: ['#bra','#bättre','#bäst']
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        audio: audio,
        user: user,
        likes: 101,
        hashtags: ['#bra','#bättre','#bäst']
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        audio: audio,
        user: user,
        likes: 1011,
        hashtags: ['#bra','#bättre','#bäst']
      },
    ];