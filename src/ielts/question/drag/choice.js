import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { css } from 'aphrodite';
import { countAllWords } from '../../../utils';
import TYPES from './types';

import styles from './styles';

const choiceSource = {
  beginDrag() {
    return {};
  },
  endDrag(props, monitor) {
    const zone = monitor.getDropResult();
    if (props.isReport) {
      return;
    }
    if (!zone) {
      props.dropSuccess(props.choiceIndex, null, props.zoneIndex, true);
      return;
    }
    props.dropSuccess(props.choiceIndex, zone.index, props.zoneIndex);
    return {
      choiceIndex: props.choiceIndex,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
  };
}
/* eslint-disable */
class Choice extends Component {
  render() {
    const { connectDragSource, isDragging, choice, zoneIndex,
      isAnswer, subjectId, isReport } = this.props;
    // 计算宽度
    let defaultAnswer = '';
    let practicalLength = 0;
    if (isAnswer) {
      defaultAnswer =`${choice.option}.${choice.text}`;
      const maxLength = (subjectId === 5 && !isReport) ? 509 : 489;
      const length = countAllWords(defaultAnswer)/ 76 * maxLength;
      practicalLength = length > maxLength ? maxLength : ((length < 181) ? 181 : length);
    }
    return connectDragSource(
      <div
        className={isAnswer ? undefined : css(styles.choiceContainer)}
        style={{
        opacity: isDragging ? 0.5 : 1,
        border: isDragging ? '2px border solid' : '',
        cursor: !isReport ? 'move' : '',
        width: `${isAnswer && practicalLength}px`,
      }}>
        {!isAnswer && `${choice.option}.${choice.text}`}
        {
          isAnswer &&
          <span
            className={css(styles.choiceBoxSelected)}
            style={{ overflowX: 'hidden', whiteSpace: 'nowrap'}}
          >
           {defaultAnswer}
          </span>
        }
      </div>
    );
  }
}

Choice.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  dropSuccess: PropTypes.func.isRequired, // 拖拽成功的函数
  choiceIndex: PropTypes.number.isRequired, // 拖拽成功的函数
  zoneIndex: PropTypes.number, // 选项所在的位置
  choice: PropTypes.object.isRequired,
  isAnswer: PropTypes.bool, // 是否在答案区
  isReport: PropTypes.bool,
  subjectId: PropTypes.number,
}

Choice.defaultProps = {
  zoneIndex: 0,
  isAnswer: false,
  subjectId: 5,
  isReport: false,
};
export default DragSource(TYPES.CHOICE, choiceSource, collect)(Choice);
