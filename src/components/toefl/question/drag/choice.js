import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { css } from 'aphrodite/no-important';
import styles from './styles';
import TYPES from './types';

const answerSource = {
  beginDrag(props) {
    return props.choice;
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const choice = monitor.getItem();
    const zone = monitor.getDropResult();
    props.dropSuccess(zone, choice);
    // CardActions.moveCardToList(item.id, dropResult.listId);
  },
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  };
}

const Answer = ({ connectDragSource, choice }) =>
  connectDragSource(
    <p className={css(styles.answerText)}>
      {choice.option}. {choice.text}
    </p>,
  );

Answer.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  choice: PropTypes.object.isRequired,
};

export default DragSource(TYPES.ANSWER, answerSource, collect)(Answer);
