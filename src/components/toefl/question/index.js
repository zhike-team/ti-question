import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, get } from 'lodash';
import { View } from '@zhike/ti-ui';
import { Block, Utils } from '@zhike/ti-component';
import ChooseOne from './chooseOne';
import ChooseMany from './chooseMany';
import Drag from './drag';
import Table from './table';
import styles from './styles';

const { normalizeArticle } = Utils;
// 问题
export default class Question extends Component {
  // 参数
  static propTypes = {
    question: PropTypes.object,
    params: PropTypes.object.isRequired,
    handleAnswer: PropTypes.func.isRequired,
    answer: PropTypes.any,
    onlyStem: PropTypes.bool,
    isReport: PropTypes.bool,
  };

  // 默认参数
  static defaultProps = {
    question: {},
    answer: '',
    onlyStem: false,
    isReport: false,
  };

  // 渲染富文本
  renderRichText = data => {
    const origin = data ? normalizeArticle(data, {}, true) || {} : {};
    return (
      <View className={styles.reportContainer}>
        {
          data &&
          <View className={styles.richTextContainer}>
            {(origin.paragraphs || []).map(
              p => (<Block key={p.id} p={p} hasAction={false} />),
            )}
          </View>
        }
      </View>
    );
  };

  // 渲染位置提示
  renderPositionTip = () => {
    const data = get(this.props, 'question.materials.0.positionTip');

    if (data) {
      const origin = normalizeArticle(data, {}, true);

      return (
        <View className={styles.richTextContainer}>
          {(origin.paragraphs || []).map(
            p => (<Block key={p.id} p={p} hasAction={false} isPositionTip />),
          )}
        </View>
      );
    }
  };

  // 渲染
  render() {
    const { question, answer, onlyStem, handleAnswer, isReport } = this.props;
    console.log('question:', this.props);
    const { direction, stem, type, materials } = question;
    const choices = get(question, 'materials.0.choices');
    const answerCount = (get(question, 'materials.0.answer') || []).length;
    const insertSentence = get(question, 'materials.0.insertSentence');

    if (isEmpty(question)) {
      return null;
    }

    if (onlyStem) {
      return (
        <View>
          {this.renderRichText(direction)}
          {this.renderRichText(stem)}
        </View>
      );
    }

    return (
      <View className={styles.container}>
        {this.renderRichText(direction)}
        {this.renderRichText(stem)}

        {
          type === 'ChooseMany' &&
          <View className={styles.answerCount}>
            Click on {answerCount} answers.
          </View>
        }

        {
          type === 'ChooseOne' &&
          <ChooseOne
            question={question}
            handleAnswer={handleAnswer}
            answer={answer}
            isReport={isReport}
          />
        }

        {
          type === 'ChooseMany' && (
          <ChooseMany
            question={question}
            handleAnswer={handleAnswer}
            answer={answer}
            isReport={isReport}
          />
        )}

        {
          type === 'Drag' && (
          <Drag
            question={question}
            materials={materials}
            choices={choices}
            handleAnswer={handleAnswer}
            answer={answer}
            isReport={isReport}
          />
        )}

        {
          type === 'Sort' && (
          <Drag
            question={question}
            materials={materials}
            choices={choices}
            handleAnswer={handleAnswer}
            answer={answer}
            isSort
            isReport={isReport}
          />
        )}

        {
          type === 'Table' && (
          <Table
            materials={materials}
            choices={choices}
            handleAnswer={handleAnswer}
            answer={answer}
            isReport={isReport}
          />
        )}

        {this.renderRichText(insertSentence)}
        {this.renderPositionTip()}
      </View>
    );
  }
}
