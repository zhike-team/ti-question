import { StyleSheet } from 'aphrodite';
import imgRadio from './images/radio.png';
import imgRadioChecked from './images/radio-checked.png';
import imgRadioHover from './images/radio-hover.png';
import imgCheckbox from './images/checkbox.png';
import imgCheckboxChecked from './images/checkbox-checked.png';
import imgCheckboxHover from './images/checkbox-hover.png';

export default StyleSheet.create({
  reportContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  richTextContainer: {
    flex: 1,
    color: '#32363A',
    letterSpacing: 0,
  },

  p: {
    margin: 0,
    marginBottom: 20,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    fontSize: 16,
    lineHeight: '24px',
  },

  input: {
    display: 'none',
  },

  label: {
    display: 'block',
    paddingLeft: 30,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px 16px',
    backgroundPosition: 'left top 4px',
    cursor: 'pointer',
  },

  radio: {
    backgroundImage: `url(${imgRadio})`,
    ':hover': {
      backgroundImage: `url(${imgRadioHover})`,
    },
  },

  radioChecked: {
    backgroundImage: `url(${imgRadioChecked})!important`,
  },

  checkbox: {
    backgroundImage: `url(${imgCheckbox})`,
    ':hover': {
      backgroundImage: `url(${imgCheckboxHover})`,
    },
  },

  checkboxChecked: {
    backgroundImage: `url(${imgCheckboxChecked})!important`,
  },

  answerCount: {
    height: 56,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#FFF8EB',
    textAlign: 'center',
    lineHeight: '60px',
  },

  reportItem: {
    position: 'relative',
    flexDirection: 'row',
    marginTop: 20,
    padding: 10,
    fontSize: 16,
    lineHeight: '24px',
    ':first-child': {
      marginTop: 0,
    },
  },

  reportItemOption: {
    width: 22,
  },

  reportItemText: {
    flex: 1,
    flexWrap: 'wrap',
  },

  reportItemCorrect: {
    backgroundColor: '#EEFFEF',
  },

  reportItemIcon: {
    position: 'absolute',
    width: 11,
    height: 8,
    bottom: 8,
    right: 9,
  },
});
