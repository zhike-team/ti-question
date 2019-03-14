import React, { Component } from 'react';
import { css } from 'aphrodite';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { Utils } from '@zhike/ti-component';
import Block from './block';
import styles from './styles';

const { normalizeArticle } = Utils;
// TODO: 数据预处理在哪里做
class Article extends Component {
  // 参数
  static propTypes = {
    material: PropTypes.object.isRequired,
    question: PropTypes.object,
    isTextOnly: PropTypes.bool,
    handleAnswer: PropTypes.func,
    handleQuestionSelect: PropTypes.func,
    answer: PropTypes.any,
    isReport: PropTypes.bool,
    progressWidth: PropTypes.number,
    qNum: PropTypes.array,
    subjectId: PropTypes.number,
    materialIds: PropTypes.array,
    dropSuccess: PropTypes.func,
    choices: PropTypes.array,
    externalInitAnswer: PropTypes.number,
    answerRsult: PropTypes.array,
    paragraphClassName: PropTypes.object,
  };

  static defaultProps = {
    isTextOnly: false,
    handleAnswer: () => {},
    handleQuestionSelect: () => {}, // 雅思填空题 && 拖拽题  用来记录当前题号
    question: {},
    answer: [],
    isReport: false,
    progressWidth: undefined,
    qNum: ['10'], // 雅思填空题 && 拖拽题  用来显示题号
    materialIds: [], // 雅思填空题 && 拖拽题  用来定位
    subjectId: 5, // 用来区分是阅读还是听力
    dropSuccess: () => {}, // 拖拽成功的 处理函数
    choices: [], // 拖拽题对应的选项
    externalInitAnswer: -1, // 外部累计InsertBlank数量
    answerRsult: [], // 答案集合
    paragraphClassName: undefined,
  };

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    const { material, question, isTextOnly, handleAnswer, handleQuestionSelect,
      answer, isReport, progressWidth, qNum, dropSuccess, choices, paragraphClassName,
      externalInitAnswer, materialIds, subjectId, answerRsult } = this.props;
    const article = normalizeArticle(
      material,
      get(question, 'materials.0.reference'),
      !isEmpty(question) ? isTextOnly : 'true',
    );
    let initAnswer = 0;
    if (!Array.isArray(article.paragraphs) ||
      article.paragraphs.length === 0 || // 段落为空数组返回false
      // 段落只有一段，并且为空是返回false
      (article.paragraphs.length === 1 && article.paragraphs[0].text === '')) {
      return false;
    }
    return (
      <div className={css(styles.container)}>
        {
          Array.isArray(article.paragraphs) &&
          article.paragraphs.map(p => {
            const count = p.inlineMarkups.filter(item => item.type === 'InsertBlank' ||
              item.type === 'InsertLine' || item.type === 'DragBlank' || item.type === 'BlankTable').length;
            initAnswer += count;
            if (p.text === '') {
              return false;
            }
            return (
              <Block
                key={p.id}
                p={p}
                handleAnswer={handleAnswer}
                handleQuestionSelect={handleQuestionSelect}
                progressWidth={progressWidth}
                answer={answer}
                isReport={isReport}
                initAnswer={externalInitAnswer === -1 ? (initAnswer - count) :
                  (externalInitAnswer + initAnswer - count)}
                qNum={qNum}
                materialIds={materialIds}
                dropSuccess={dropSuccess}
                choices={choices}
                subjectId={subjectId}
                answerRsult={answerRsult}
                paragraphClassName={paragraphClassName}
              />
            );
          })
        }
      </div>
    );
  }
}

export default withRouter(Article);
