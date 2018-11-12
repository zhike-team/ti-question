import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    height: 86,
    width: '100%',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    height: 86,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#36424D',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  containerTest: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #EAEFF2',
  },

  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleLogo: {
    height: 28,
  },

  titleLogoTest: {
    height: 26,
  },

  titleSplit: {
    width: 1,
    height: 28,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#878F98',
  },

  titleSplitTest: {
    width: 2,
    height: 24,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: '#385DAE',
  },

  titleText: {
    display: 'inline-block',
    width: 400,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  titleTextTest: {
    fontSize: 20,
    color: '#385DAE',
  },

  questionTest: {
    marginRight: 24,
    height: 28,
    lineHeight: '28px',
    fontSize: 18,
    color: '#505050',
  },

  normalButtons: {
    flexDirection: 'row',
  },

  button: {
    marginLeft: 10,
    backgroundImage: '16px 16px',
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
});
