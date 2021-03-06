import React from 'react';
import { APIKit, getToken, onFailure } from '../../../shared/APIkit';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

const { manifest } = Constants;

async function createPost(
    recordingURIP: any,
    hashtags: string[],
    endPoint: string,
    c: any,
    answerToId: string | null = null
) {
    let apiUrl =
        `http://${manifest?.debuggerHost?.split(':').shift()}:3000` +
        '/posts/upload-audio/';
    const token = await getToken();

    const uriParts = recordingURIP.split('.');
    const fileType = '.' + uriParts[uriParts.length - 1];

    return FileSystem.uploadAsync(apiUrl, recordingURIP, {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            var urlNoQuotes = res.body.split('"').join('');
            let payload = {};
            if (endPoint === '/posts') {
                payload = {
                    hashtags: hashtags,
                    audio: urlNoQuotes,
                    audioFileType: fileType,
                    inReplyToPostId: answerToId,
                    user: {
                        id: c.userInfo._id,
                        profileAudio: c.userInfo.profileAudio,
                        profileAudioFileType: c.userInfo.profileAudioFileType,
                        profilePicture: c.userInfo.profilePicture,
                        userName: c.userInfo.userName,
                        email: c.userInfo.email,
                    },
                };
            } else {
                payload = {
                    url: urlNoQuotes,
                    profileAudioFileType: fileType
                };
            }
            return APIKit.post(endPoint, payload)
                .then(() => {
                    return {url: urlNoQuotes, fileType: fileType};
                })
                .catch((error) => {
                    onFailure(error, c);
                    console.log('Error:' + error);
                });
        })
        .catch((error) => {
            onFailure(error, c);
            console.log('Error:' + error);
        });
}
export { createPost };
