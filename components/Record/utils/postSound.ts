import { APIKit, getToken } from "../../../shared/APIkit";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";

const { manifest } = Constants;



async function postSound(recordingURIP: any, hashtags: string[], endPoint: string) {
    let apiUrl =
      `http://${manifest?.debuggerHost?.split(":").shift()}:3000` +
      "/posts/upload-audio/";
    const token = await getToken();

    const uriParts = recordingURIP.split(".");
    const fileType = "." + uriParts[uriParts.length - 1];

    FileSystem.uploadAsync(apiUrl, recordingURIP, {
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "file",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        var urlNoQuotes = res.body.split('"').join("");
        // TODO: Change from mockup data to real user data
        const payload = {
          hashtags: hashtags,
          audio: urlNoQuotes,
          audioFileType: fileType,
          user: {
            profileAudio: "url",
            profilePicture: "url",
            userName: "test",
            email: "test@erk.com",
          },
        };
        APIKit.post(endPoint, payload)
          .then((response) => {
            console.log(response.data);
            
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  export {postSound}

  /** 
   * user: {
            profileAudio: "url",
            profilePicture: "url",
            userName: "test",
            email: "test@erk.com",
          },
  */