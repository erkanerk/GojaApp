/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PostType } from "./constants/types/PostType";
import { AnswerInfo } from "./screens/postFlow/RecordingScreen"

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    Modal: undefined;
    RecordModal: { 
      recordingScreenType: PostType;
      answerInfo?: AnswerInfo;
    };
    NotFound: undefined;
    Auth: undefined;
    ChoosePic: undefined;
    RecordProfileSound: { recordingScreenType: PostType};
    NotificationScreen: undefined;
    ProfileScreen: { userId: string };
    SearchScreen: undefined;
    HomeScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  FeedTab: undefined;
  RecordTab: { 
    recordingScreenType: PostType;
    answerInfo?: AnswerInfo; 
  };
  SearchTab: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
