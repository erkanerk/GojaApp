import { APIKit, getToken } from "../../../shared/APIkit";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";

const { manifest } = Constants;

async function postSound(
  recordingURIP: any,
  hashtags: string[],
  endPoint: string,
  user: {
    profileAudio: string | null;
    profilePicture: string | null;
    userName: string | null;
    email: string | null;
  },
  answerToId: string | null = null
) {
  let apiUrl =
    `http://${manifest?.debuggerHost?.split(":").shift()}:3000` +
    "/posts/upload-audio/";
  const token = await getToken();
  //const globalCtx = useContext(AppContext);

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
        inReplpyToPostId: answerToId,
        user: user,
      };
      APIKit.post(endPoint, payload)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          //onFailure(error, globalCtx);
          console.log(error);
        });
    })
    .catch((error) => {
      //onFailure(error, globalCtx);
      console.log(error);
    });
}
export { postSound };
