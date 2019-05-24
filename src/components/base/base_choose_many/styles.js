import { StyleSheet } from 'aphrodite';
import imgCheckbox from './assets/checkbox.png';
import imgCheckboxChecked from './assets/checkbox-checked.png';
import imgCheckboxHover from './assets/checkbox-hover.png';

export default StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 80,
    alignSelf: 'center',
    width: 700,
  },

  text: {
    fontFamily: 'PingFangSC-Regular',
    color: '#32363A',
  },

  p: {
    margin: 0,
    marginTop: 20,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    fontSize: 16,
    lineHeight: '16px',
  },

  input: {
    display: 'none',
  },

  labels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'block',
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

  checkbox: {
    backgroundImage: `url(${imgCheckbox})`,
    ':hover': {
      backgroundImage: `url(${imgCheckboxHover})`,
    },
  },

  checkboxChecked: {
    backgroundImage: `url(${imgCheckboxChecked})!important`,
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
    flexWrap: 'wrap',
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
