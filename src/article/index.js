import React, { Component } from 'react';
import { css } from 'aphrodite';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { normalizeArticle } from './utils';
import Block from './block';
import styles from './styles';

// TODO: 数据预处理在哪里做
export default class Article extends Component {
  static defaultProps = {
    isTextOnly: false,
    handleAnswer: () => {},
    location: {},
    question: {},
    answer: '',
    isReport: false,
    progressWidth: undefined,
    isPositionTip: false,
    paragraphClassName: undefined,
  };

  static propTypes = {
    material: PropTypes.object.isRequired,
    question: PropTypes.object,
    isTextOnly: PropTypes.bool,
    handleAnswer: PropTypes.func,
    location: PropTypes.object,
    answer: PropTypes.any,
    isReport: PropTypes.bool,
    progressWidth: PropTypes.number,
    isPositionTip: PropTypes.bool,
    paragraphClassName: PropTypes.object,
  };

  componentDidMount() {
    if (!this.props.isReport) {
      setTimeout(() => {
        if (this.anchor) {
          this.anchor.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isReport) {
      if (this.props.location && this.props.location.pathname !== prevProps.location.pathname) {
        if (this.anchor) {
          setTimeout(() => {
            this.anchor.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }
      }
    }
  }

  render() {
    const { material, question, isTextOnly, handleAnswer,
      answer, isReport, progressWidth,
    } = this.props;
    const article = normalizeArticle(
      material,
      get(question, 'materials.0.reference'),
      !isEmpty(question) ? isTextOnly : 'true',
    );
    const props = {};
    if (question.type === 'Insert') {
      props.handleAnswer = this.props.handleAnswer;
      // 暂时不支持富文本
      props.insertSentence = get(question, 'materials.0.insertSentence.paragraphs.0.text');
    }

    let initAnswer = 0;
    if (!Array.isArray(article.paragraphs) ||
      article.paragraphs.length === 0 || // 段落为空数组返回false
      // 段落只有一段，并且为空是返回false
      (article.paragraphs.length === 1 && article.paragraphs[0].text === '')) {
      return false;
    }
    return (
      <div className={css(styles.container)}>
        <div
          ref={node => {
            if (!article.hasAnchor && !isTextOnly) {
              this.anchor = node;
            }
          }}
        />
        {
          Array.isArray(article.paragraphs) &&
          article.paragraphs.map(p => {
            const count = p.inlineMarkups.filter(item => item.type === 'InsertBlank' || item.type === 'Insert' ||
              item.type === 'InsertLine' || item.type === 'DragBlank' || item.type === 'BlankTable').length;
            initAnswer += count;
            if (p.text === '') {
              return false;
            }
            return (
              <Block
                key={p.id}
                p={p}
                {...props}
                handleAnswer={handleAnswer}
                progressWidth={progressWidth}
                answer={Array.isArray(answer) ? answer : isReport ? get(question, 'materials.0.answer') : answer}
                isReport={isReport}
                initAnswer={initAnswer - count}
              />
            );
          })
        }
      </div>
    );
  }
}

