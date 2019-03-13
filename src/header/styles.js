import { StyleSheet } from 'aphrodite';
import { getBodyWidth } from '../utils';

export default StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    height: 86,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#36424D',
    alignItems: 'center',
  },
  question: {
    position: 'absolute',
    fontSize: 18,
    bottom: 12,
    left: (getBodyWidth() - 300) / 2,
    width: 300,
    color: '#fff',
    marginTop: 38,
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  containerTest: {
    backgroundColor: '#385DAE',
  },

  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleLogo: {
    height: 28,
  },

  titleSplit: {
    width: 1,
    height: 28,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  titleText: {
    display: 'block',
    width: 500,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  subjects: {
    position: 'relative',
    margin: '0 auto',
    flexDirection: 'row',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: '16px',
  },

  line: {
    position: 'absolute',
    top: 10,
    left: 40,
    width: 240,
    height: 1,
    background: 'rgba(255,255,255,0.2)',
    zIndex: 1,
  },
  subject: {
    width: 80,
    textAlign: 'center',
  },

  normalButtons: {
    flexDirection: 'row',
  },

  button: {
    marginLeft: 10,
  },

  buttonTest: {
    backgroundColor: '#fff',
    color: '#333',
    ':hover': {
      backgroundColor: '#EDF3FF',
    },
  },

  buttonTimeTest: {
    flexDirection: 'row',
    marginRight: 20,
    height: 28,
    lineHeight: '28px',
    fontSize: 14,
    color: '#FFFFFF',
  },

  timeIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
    marginTop: 8,
  },
  volumeWrapper: {
    position: 'relative',
  },
  volumeBodyWrapper: {
    position: 'fixed',
    zIndex: 10,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  volume: {
    position: 'absolute',
    zIndex: 20,
    width: 86,
    height: 20,
    left: 10,
    top: 32,
    backgroundColor: '#fff',
    borderRadius: 3,
  },

  volumeProcessBarWrapper: {
    position: 'relative',
    width: 66,
    height: 2,
    marginTop: 9,
    marginLeft: 10,
    backgroundColor: '#C3CCD1',
    borderRadius: 1,
  },

  volumeProcessBar: {
    height: 2,
    backgroundColor: '#3399FF',
    borderRadius: 1,
  },

  volumeProcessCircle: {
    position: 'absolute',
    width: 11,
    height: 11,
    top: -5,
    border: '1px solid #878F98',
    borderRadius: 11,
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'background-color .15s',
    userSelect: 'none',
    ':hover': {
      backgroundColor: '#f5f5f5',
    },
  },

  volumeTriangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: -4,
    left: 38,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: '4px solid #fff',
  },

  shortcutTipWrapper: {
    position: 'relative',
  },

  shortcutTip: {
    position: 'absolute',
    top: 28,
    left: 10,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    lineHeight: '28px',
    userSelect: 'none',
    opacity: 0.5,
  },
  modalTip: {
    justifyItems: 'center',
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
