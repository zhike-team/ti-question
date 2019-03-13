import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    marginTop: '40px',
  },

  dragContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: '40px',
  },

  contentForImage: {
    flex: 1,
    flexDirection: 'column',
  },

  contentNoImage: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  contentForReading: {
    width: '100%',
    flexDirection: 'column',
  },

  sourceContainer: {
    display: 'inline-block',
    boxSizing: 'border-box',
    marginBottom: '10px',
    ':last-child': {
      marginBottom: '0px',
    },
    fontSize: '16px',
    fontFamily: 'PingFangSC-Regular',
    color: 'rgba(50,54,58,1)',
    lineHeight: '22px',
  },

  sourceForReport: {
    maxWidth: '508px',
  },

  sourceForNoImage: {
    maxWidth: '400px',
    marginLeft: '40px',
  },

  sourceForImage: {
    maxWidth: '630px',
  },

  sourceForReading: {
    maxWidth: '508px',
  },

  targetContainer: {
    display: 'inline-block',
    padding: '0px 8px 4px',
    verticalAlign: 'middle',
  },

  leftForImage: {
    flex: 1,
  },

  leftForReading: {
    flex: 1,
    marginTop: '40px',
  },

  choiceContainer: {
    display: 'inline-block',
    background: 'rgba(246,248,249,1)',
    padding: '10px 12px',
  },

  rightForListening: {
    marginTop: '40px',
  },

  right: {
    marginTop: '40px',
  },

  choiceBox: {
    display: 'inline-block',
    height: '40px',
    fontSize: '16px',
    fontFamily: 'PingFangSC-Regular',
    color: 'rgba(50,54,58,1)',
    lineHeight: '24px',
    border: '0px',
  },

  choiceBoxSelected: {
    display: 'inline-block',
    width: 'inherit',
    height: '40px',
    fontSize: '16px',
    fontFamily: 'PingFangSC-Regular',
    padding: '0px 6px 0px 13px',
    border: '0px',
    boxSizing: 'border-box',
    color: 'rgba(50,54,58,1)',
    cursor: 'move',
    verticalAlign: 'middle',
    textAlign: 'center',
    // marginBottom: '8px',
  },

  choiceBoxNormal: {
    width: 'inherit',
    height: '40px',
    fontSize: '16px',
    fontFamily: 'PingFangSC-Regular',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(135,143,152,1)',
  },

  answerText: {
    margin: '0px',
    cursor: 'move',
  },

  imgForDrag: {
    position: 'relative',
    lineHeight: 0,
    alignSelf: 'start',
  },

  picReport: {
    width: '500px',
    marginBottom: '20px',
  },

  pic: {
    width: '500px',
    marginRight: '40px',
  },

  picForReading: {
    width: '500px',
    marginTop: '40px',
  },

  scope: {
    position: 'absolute',
    width: '32px',
    bottom: 0,
    left: 468,
    cursor: 'pointer',
  },

  choiceReport: {
    display: 'inline-block',
    width: 'inherit',
    height: '40px',
    fontSize: '16px',
    fontFamily: 'PingFangSC-Regular',
    padding: '0px 6px 5px 13px',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    textAlign: 'center',
    boxSizing: 'border-box',
  },

  correct: {
    color: 'rgba(73,207,81,1)',
  },

  error: {
    color: 'rgba(253,84,84,1)',
  },

  paragraphClass: {
    lineHeight: '48px',
  },
});
