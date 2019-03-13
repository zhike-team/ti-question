import { StyleSheet } from 'aphrodite';

const shining = {
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
  '100%': {
    opacity: 1,
  },
}

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: '40px 20px',
    background: '#F6F8F9',
  },

  direction: {
    width: '700px',
    color: '#32363A',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '0 auto 20px',
  },

  content: {
    flex: 1,
    width: '700px',
    margin: '0 auto',
    overflow: 'auto',
  },

  item: {
    background: '#fff',
    padding: '30px 30px 20px',
    borderBottom: '1px solid #DCE6EC',
    ':last-child': {
      borderBottom: 'none',
    },
  },
  clickable: {
    cursor: 'pointer',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'start',
  },
  raw: {
    whiteSpace: 'pre-wrap',
    fontSize: '18px',
    lineHeight: '26px',
    marginRight: '30px',
    color: '#32363A',
    flex: 1,
  },
  rawBlock: {
    height: '24px',
    marginTop: '8px',
    background: '#C3CCD1',
  },
  score: {
    height: '60px',
    width: '60px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  flag: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  number: {
    zIndex: 1,
    marginTop: '-16px',
  },
  grey: {
    opacity: 0.5,
  },

  recorder: {
    padding: '50px 0',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  side: {
    width: '40px',
  },
  shining: {
    animationName: shining,
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  main: {
    width: '50px',
    margin: '0 50px',
  },
  tips: {
    color: '#878F98',
    fontSize: '12px',
    lineHeight: '17px',
    position: 'absolute',
    bottom: '17px',
    width: '100%',
    textAlign: 'center',
  },
  error: {
    color: '#FD5454',
  },

  tr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dashed: {
    height: '60px',
    borderBottom: '1px dashed #DCE6EC',
    ':last-child': {
      borderBottom: 'none',
    },
  },
  td: {
    width: '30%',
    display: 'block',
    padding: '0 5px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  th: {
    color: '#32363A',
    fontSize: '16px',
    lineHeight: '34px',
    background: '#F6F8F9',
  },
  whiteBg: {
    background: '#fff',
  },
  word: {
    color: '#32363A',
    fontSize: '16px',
  },
  text: {
    color: '#878F98',
    fontSize: '14px',
  },
  noText: {
    color: '#FD5454',
    fontSize: '14px',
  },
  pronounce: {
    background: '#fff',
    padding: '0 20px',
  },
  pronounceTd: {
    lineHeight: 0,
  },
  emptyAnswer: {
    fontSize: '12px',
    lineHeight: '17px',
    textAlign: 'center',
    color: '#FD5454',
  },

  modalAlert: {
    alignItems: 'center',
  },

  modalAlertImage: {
    width: 90,
    height: 90,
    marginTop: 20,
  },

  modalAlertText: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 40,
  },
});
