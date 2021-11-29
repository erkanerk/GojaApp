import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { APIKit, onFailure } from '../../shared/APIkit';
import AppContext from '../../shared/AppContext';
import { useIsFocused } from '@react-navigation/native';
import { FollowButton } from './subComponents/FollowButton';
import { Stats } from './subComponents/Stats';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    imageView: {
        alignItems: 'center',
        margin: 2,
    },
    textView: {
        alignItems: 'center',
        margin: 5,
    },
    text: {
        color: 'black',
    },
    UserNameText: {
        fontSize: 20,
        color: 'black',
    },
    line: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    followButtonView: {
        alignItems: 'center',
        margin: 10,
    },
    statsView: {
        margin: 10,
    },
});

interface Props {
    tab: number;
    setTab: Dispatch<SetStateAction<number>>;
}

export const ProfileInformation = ({ tab, setTab }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const [user, setUser] = useState<UserInfo | undefined>(undefined);
    const globalCtx = useContext(AppContext);

    async function getUserInformation() {
        setIsLoading(true);
        console.log('Fetching user information');
        APIKit.get('/users/profile/me')
            .then((response) => {
                console.log('Successful /users/profile/me response: ');
                console.log(response.data);
                setUser(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (isFocused) {
            getUserInformation();
        }
    }, [isFocused]);

    if (!user) {
        return <ActivityIndicator size="large" color={'lightgray'} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image
                    style={styles.image}
                    source={{
                        uri: user.profilePicture,
                    }}
                />
            </View>
            <View style={styles.textView}>
                <Text style={styles.UserNameText}>{user.userName}</Text>
            </View>
            <View style={styles.followButtonView}>
                <FollowButton />
            </View>
            <View style={styles.statsView}>
                <Stats user={user} tab={tab} setTab={setTab} />
            </View>
            <View style={styles.line} />
        </View>
    );
};
