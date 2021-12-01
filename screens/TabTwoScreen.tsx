import * as React from 'react';
import { View } from '../components/Themed';
import { RecordingScreen } from './postFlow/RecordingScreen';
import { PostType } from './postFlow/RecordingScreen';

export default function TabTwoScreen() {
    const testAnswerInfo = {
        answerId: 'TestID',
        imageUrl:
            'https://i.pinimg.com/236x/20/1f/01/201f016bd3a8576fc6cfc872ecac648e--dwight-schrute-hero-.jpg',
        username: 'TestU',
        hashtags: ['hashtags'],
    };
    return (
        <View>
            <RecordingScreen
                recordingScreenType={PostType.ANSWER}
                answerInfo={testAnswerInfo}
            />
        </View>
    );
}
