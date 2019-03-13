import { StyleSheet } from 'aphrodite';
import imgArrow from './assets/arrow.png';
import imgBlock from './assets/block.png';
import imgHeadset from './assets/headset.png';

export default StyleSheet.create({
  blockContainer: {
    position: 'relative',
  },

  arrow: {
    marginLeft: 10,
    width: 14,
    height: 14,
    border: 'none',
  },

  paragraph: {
    marginTop: 20,
    ':first-child': {
      marginTop: 0,
    },
  },

  block: {
    marginTop: 20,
    ':first-child': {
      marginTop: 0,
    },
    whiteSpace: 'pre-wrap',
  },

  blockIndent: {
    textIndent: '2em',
  },

  blockArrow: {
    '::before': {
      position: 'absolute',
      textIndent: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      content: '""',
      backgroundImage: `url(${imgArrow})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '14px 14px',
      backgroundPosition: 'left top 5px',
    },
  },

  blockArrowBlank: {
    display: 'inline-block',
    width: 20,
  },

  blockAlignLeft: {
    textAlign: 'left',
  },

  blockAlignCenter: {
    textAlign: 'center',
  },

  blockAlignRight: {
    textAlign: 'right',
  },

  inlineFontSizeH1: {
    fontSize: 24,
    lineHeight: '34px',
  },

  inlineFontSizeH2: {
    fontSize: 20,
    lineHeight: '30px',
  },

  inlineFontSizeSup: {
    fontSize: '75%',
    lineHeight: 0,
    position: 'relative',
    verticalAlign: 'baseline',
    top: '-0.5em',
  },

  inlineFontSizeSub: {
    fontSize: '75%',
    lineHeight: 0,
    position: 'relative',
    verticalAlign: 'baseline',
    bottom: '-0.25em',
  },

  inlineHighlight: {
    backgroundColor: '#D5DCDF',
  },

  inlineBold: {
    fontWeight: 'Bold',
  },

  inlineItalic: {
    fontStyle: 'italic',
  },

  inlineUnderline: {
    textDecoration: 'underline',
  },

  inlineInsert: {
    display: 'inline-block',
    width: 26,
    height: 14,
    marginBottom: -1,
    backgroundImage: `url(${imgBlock})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '14px 14px',
    backgroundPosition: 'center bottom',
  },

  inlineEarphone: {
    '::after': {
      position: 'absolute',
      width: 24,
      height: 24,
      top: 0,
      right: -30,
      content: '""',
      backgroundImage: `url(${imgHeadset})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '24px 24px',
      backgroundPosition: 'center center',
    },
    position: 'relative',
    display: 'inline-block',
  },

  input: {
    margin: '0 1px',
    padding: '0 4px',
    fontFamily: 'PingFangSC-Regular',
    lineHeight: '32px',
    color: '#32363A',
    fontSize: '16px',
  },

  smallLine: {
    margin: '0 1px',
    padding: '0 4px',
    fontFamily: 'PingFangSC-Regular',
    lineHeight: '32px',
    color: '#32363A',
    fontSize: '16px',
    marginTop: 10,
    borderBottom: '1px solid rgba(50,54,58,1) ',
    width: '135px',
    borderRadius: '3px',
  },
  middleLine: {
    margin: '0 1px',
    padding: '0 4px',
    fontFamily: 'PingFangSC-Regular',
    lineHeight: '32px',
    color: '#32363A',
    fontSize: '16px',
    marginTop: 10,
    borderBottom: '1px solid rgba(50,54,58,1) ',
    width: '60%',
  },
  largeLine: {
    margin: '0 1px',
    padding: '0 4px',
    fontFamily: 'PingFangSC-Regular',
    lineHeight: '32px',
    color: '#32363A',
    fontSize: '16px',
    marginTop: 10,
    borderBottom: '1px solid rgba(50,54,58,1) ',
    width: '90%',
  },
  image: {
    width: '100%',
  },
  exercise: {
    boxSizing: 'border-box',
    width: 700,
    padding: 20,
    backgroundColor: 'rgba(246,248,249,1)',
  },
  insertBlank: {
    width: '200px',
    height: '40px',
    border: '1px solid rgba(135,143,152,1)',
    textAlign: 'center',
    fontSize: '16px',
    fontFamily: 'PingFangSC-Regular',
    color: 'rgba(50,54,58,1)',
    lineHeight: '22px',
    margin: '8px 8px 0px 8px',
  },
  correct: {
    width: '200px',
    height: '40px',
    border: '1px solid rgba(135,143,152,1)',
    textAlign: 'center',
    fontSize: '16px',
    lineHeight: '22px',
    margin: '8px 8px 0px 8px',
    color: 'rgba(73,207,81,1)',
  },
  error: {
    width: '200px',
    height: '40px',
    border: '1px solid rgba(135,143,152,1)',
    textAlign: 'center',
    fontSize: '16px',
    lineHeight: '22px',
    margin: '8px 8px 0px 8px',
    color: 'rgba(253,84,84,1)',
  },
  ieltsBlank: {
    height: '40px',
    lineHeight: '40px',
    verticalAlign: 'baseline',
  },
});
