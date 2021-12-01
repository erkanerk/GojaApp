import * as React from 'react';
import { View } from '../components/Themed';
import { RecordingScreen } from './postFlow/RecordingScreen';
import { PostType } from './postFlow/RecordingScreen';

export default function TabTwoScreen() {
    return (
        <View>
            <RecordingScreen recordingScreenType={PostType.ANSWER} />
        </View>
    );
}
