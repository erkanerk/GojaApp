import React from "react";

const AppContext = React.createContext({
    loggedIn: false,
    setLoggedIn: (status) => {},
    userInfo: {
        _id: null,
        profileAudio: null,
        profilePicture: undefined,
        userName: null,
        email: null,
    },
    setUserInfo: (user) => {},
    mainFeedPosts: [
        {
            _id: null,
            hashtags: null,
            audio: null,
            user: null,
            commentsCount: null,
            created_at: null,
            likes: null,
            likedByUsers: null,
            __v: null,
            inReplyToUser: null,
        },
    ],
    setMainFeedPosts: (posts) => {},
});

export default AppContext;
