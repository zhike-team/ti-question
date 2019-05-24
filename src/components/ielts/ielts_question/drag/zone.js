import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { css } from 'aphrodite';
import { Utils } from '@zhike/ti-component';
import TYPES from './types';
import Choice from './choice';
import styles from './styles';

const { countAllWords } = Utils;
const squareTarget = {
  canDrop() {
    return true;
  },

  drop(props, monitor) {
    return { index: props.zoneIndex, isOver: monitor.isOver() };
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

/* eslint-disable */
class Zone extends Component {
	render() {
		const { connectDropTarget, isOver, canDrop, isCorrect, placeholder, choice,
				choiceIndex, isAnswer, dropSuccess, choices, zoneIndex, subjectId, isReport, id} = this.props;
		// 计算宽度
		let practicalLength = 181;
		  // 计算宽度
			let defaultAnswer;
			if (isReport && JSON.stringify(choice) == "{}") {
				defaultAnswer = '--';
			} else if (isReport){
				defaultAnswer =`${choice.option}.${choice.text}`;
			}
		if (isAnswer) {

			defaultAnswer =`${choice.option}.${choice.text}`;
		}
		const maxLength = (subjectId === 5 && !isReport) ? 509 : 489;
		const length = countAllWords(defaultAnswer)/ 76 * maxLength;
		practicalLength = length > maxLength ? maxLength : ((length < 181) ? 181 : length);
		// 报告页样式

		return connectDropTarget(
			<div
				className={!isReport ? css(styles.choiceBoxSelected):
					(isCorrect ? css([styles.correct, styles.choiceReport]) :
					css([styles.error, styles.choiceReport]))
				}
				id={id}
				style={{
					marginBottom: isReport ? '0px' : '8px',
				}}
			>
				<div
					style={{
						display: 'inline-block',
						width: `${practicalLength}px`,
						minWidth: '200px',
						height: '40px',
						border: `${isOver && !isReport ? '1px dashed #878F98' : '1px solid #878F98'}`,
						backgroundColor: `${isOver && !isReport ? 'lightYellow' : 'white'}`,
						overflow: 'hidden',
					}}
				>
					{ isAnswer  && !isReport &&
						<Choice
							choiceIndex={choiceIndex}
							dropSuccess={dropSuccess}
							choice={choices[choiceIndex]}
							zoneIndex={zoneIndex}
							isAnswer
							subjectId={subjectId}
						/>
					}
					{
						isReport &&
						<input
							readOnly
							value={defaultAnswer}
							className={!isReport ? css(styles.choiceBoxSelected):
								(isCorrect ? css([styles.correct, styles.choiceReport]) :
								css([styles.error, styles.choiceReport]))
							}
							style={{
								background: 'none',
								outline: 'none',
								border: '0px',
								boxSizing: 'border-box',
							}}
						/>
					}
					{
						!isReport && !isAnswer &&
						placeholder
					}
				</div>

			</div>
		)
	}
}

Zone.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
	isOver: PropTypes.bool.isRequired,
	zoneIndex: PropTypes.number,
	choiceIndex: PropTypes.number,
	choices: PropTypes.array,
	choice: PropTypes.object, // 用户答案
	isAnswer: PropTypes.bool,
	isReport: PropTypes.bool,
  subjectId: PropTypes.number,
	dropSuccess: PropTypes.func.isRequired, // 拖拽成功的函数
	isCorrect: PropTypes.bool,
	placeholder: PropTypes.string, // 显示的默认值
	id: PropTypes.string.isRequired,
};

Zone.defaultProps = {
	choiceIndex: 0,
	isAnswer: false,
	choice: {},
	choices: [],
	subjectId: 5,
	isReport: false,
	isCorrect: true,
	placeholder: '',
};
export default DropTarget(TYPES.CHOICE, squareTarget, collect)(Zone);
