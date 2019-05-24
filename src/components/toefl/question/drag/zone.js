import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { css } from 'aphrodite/no-important';
import styles from './styles';
import TYPES from './types';

import Choice from './choice';

const answerTarget = {
  drop(props) {
    return { index: props.index, isAnswer: props.isAnswer };
  },
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

/* eslint-disable */
const Zone = props => {
  const { connectDropTarget, choice, isAnswer, dropSuccess, isSelected, isDragMore, isOdd } = props;
  return connectDropTarget(
    <div
      className={css(
        styles.zone,
        isAnswer ? styles.zoneForAnswer : styles.zoneForChoice,
        isDragMore && styles.zoneDragMore,
        !isDragMore && isOdd && styles.zoneOdd,
      )}
      onClick={isAnswer && choice ? () => dropSuccess({}, choice) : undefined}
    >
      <div
        className={css(
          styles.choiceBox,
          isAnswer ? styles.choiceBoxForAnswer : styles.choiceBoxForChoice,
        )}>
        {!!choice && !isSelected && <Choice choice={choice} dropSuccess={dropSuccess} />}
      </div>
    </div>,
  );
};
/* eslint-enable */

Zone.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  choice: PropTypes.object,
  // 是否在答题区
  isAnswer: PropTypes.bool,
  dropSuccess: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  isDragMore: PropTypes.bool,
};

Zone.defaultProps = {
  type: 'answer',
  isSelected: false,
  isAnswer: false,
  isDragMore: false,
};

export default DropTarget(TYPES.ANSWER, answerTarget, collect)(Zone);
