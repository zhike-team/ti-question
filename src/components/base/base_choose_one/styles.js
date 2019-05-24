import { StyleSheet } from 'aphrodite';
import imgRadio from './assets/radio.png';
import imgRadioChecked from './assets/radio-checked.png';
import imgRadioHover from './assets/radio-hover.png';

export default StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 80,
    alignSelf: 'center',
    width: 700,
  },

  p: {
    margin: 0,
    marginTop: 20,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    fontSize: 16,
  },

  input: {
    display: 'none',
  },

  label: {
    display: 'flex',
    paddingLeft: 30,
    lineHeight: '24px',
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
  reportItemRichText: {
    marginBottom: '-20px',
  },

  reportItemOption: {
    width: 22,
    lineHeight: '24px',
  },

  reportItemText: {
    flex: 1,
    flexWrap: 'nowrap',
    paddingRight: '25px',
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
    top: 19,
    right: 15,
  },
});
