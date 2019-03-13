import { StyleSheet } from 'aphrodite';
import imgRadio from './assets/radio.png';
import imgRadioChecked from './assets/radio-checked.png';
import imgRadioHover from './assets/radio-hover.png';

export default StyleSheet.create({
  container: {
  },

  subStem: {
    marginTop: 20,
    lineHeight: '22px',
  },

  reading: {
    padding: '9px 12px',
    background: '#f6f8f9',
    border: '1px solid #c3ccd1',
    cursor: 'pointer',
  },

  p: {
    margin: 0,
    marginTop: 20,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    fontSize: 16,
  },
  pForListening: {
    marginLeft: '32px',
  },
  pForReading: {
    marginLeft: '16px',
  },
  input: {
    display: 'none',
  },

  label: {
    display: 'block',
    paddingLeft: 30,
    lineHeight: '22px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px 16px',
    backgroundPositionY: '3px',
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
  reportItem: {
    position: 'relative',
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 10,
    paddingTop: 11,
    paddingBottom: 13,
    fontSize: 16,
    lineHeight: '16px',
    ':first-child': {
      marginTop: 20,
    },
  },

  reportItemOption: {
    width: 22,
    lineHeight: '24px',
  },

  reportItemText: {
    flex: 1,
    flexWrap: 'nowrap',
    lineHeight: '24px',
  },

  reportItemCorrect: {
    backgroundColor: '#EEFFEF',
  },

  reportItemError: {
    background: 'rgba(255,240,240,1)',
  },

  reportItemIcon: {
    position: 'absolute',
    width: 11,
    height: 9,
    top: '50%',
    right: 15,
    transform: 'translateY(-50%)',
  },
});
