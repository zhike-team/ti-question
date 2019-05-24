import ChooseOneQuestion from './components/base/choose_one';
import ChooseManyQuestion from './components/base/choose_many';
import BlankQuestion from './components/base/blank';
import SpeakingQuestion from './components/base/speaking';
import WritingQuestion from './components/base/writing';
import FollowUpQuestion from './components/base/follow_up';

import ReadingComponent from './components/ielts/reading';
import listeningComponent from './components/ielts/listening';

import ReadingComponent1 from './components/toefl/reading';
import listeningComponent1 from './components/toefl/listening/listening_question';
import listeningPlayer from './components/toefl/listening/listening_player';

import TipComponent from './components/tip';

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

// 阶段测评提示页
export const Tip = TipComponent;
