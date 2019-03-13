import ChooseOneQuestion from './base/choose_one';
import ChooseManyQuestion from './base/choose_many';
import BlankQuestion from './base/blank';
import SpeakingQuestion from './base/speaking';
import WritingQuestion from './base/writing';
import FollowUpQuestion from './base/follow_up';

import ReadingComponent from './ielts/reading';
import listeningComponent from './ielts/listening';

import ReadingComponent1 from './toefl/reading';
import listeningComponent1 from './toefl/listening/listening_question';
import listeningPlayer from './toefl/listening/listening_player';

// import { normalizeArticle } from './utils/article';
import Utils from './utils';

console.log('Utils:', Utils);

// 基础题库题型页面
export const ChooseOne = ChooseOneQuestion;
export const ChooseMany = ChooseManyQuestion;
export const Blank = BlankQuestion;
export const Speaking = SpeakingQuestion;
export const Writing = WritingQuestion;
export const FollowUp = FollowUpQuestion;

// 雅思题库题型页面
export const IeltsReading = ReadingComponent;
export const IeltsListening = listeningComponent;

// 托福题库题型页面
export const ToeflReading = ReadingComponent1;
export const ToeflListening = listeningComponent1;
export const ToeflListenPlayer = listeningPlayer;
