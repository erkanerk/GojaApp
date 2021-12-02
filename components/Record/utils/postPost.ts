import React from 'react';
import { APIKit, getToken, onFailure } from '../../../shared/APIkit';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
const { manifest } = Constants;

async function PostPost(
    recordingURIP: any,
    hashtags: string[],
    endPoint: string,
    c: any,
    answerToId: string | null = null
) {
    console.log('ANSWERTOID', answerToId);
    let apiUrl =
        `http://${manifest?.debuggerHost?.split(':').shift()}:3000` +
        '/posts/upload-audio/';
    const token = await getToken();

    const uriParts = recordingURIP.split('.');
    const fileType = '.' + uriParts[uriParts.length - 1];

    FileSystem.uploadAsync(apiUrl, recordingURIP, {
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
            const payload = {
                hashtags: hashtags,
                audio: urlNoQuotes,
                audioFileType: fileType,
                inReplyToPostId: answerToId,
                user: {
                    id: c.userInfo._id,
                    profileAudio: c.userInfo.profileAudio,
                    profilePicture: c.userInfo.profilePicture,
                    userName: c.userInfo.userName,
                    email: c.userInfo.email,
                },
            };
            APIKit.post(endPoint, payload)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    onFailure(error, c);
                    console.log(error);
                });
        })
        .catch((error) => {
            onFailure(error, c);
            console.log(error);
        });
}
export { PostPost };
