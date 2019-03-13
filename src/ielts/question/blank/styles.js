import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    alignSelf: 'center',
    width: '100%',
  },

  contentForListening: {
    width: '100%',
    flexDirection: 'colunm',
    flexWrap: 'wrap',
  },

  contentForReading: {
    width: '100%',
    flexWrap: 'wrap',
  },

  imageForListening: {
    display: 'inline-block',
    marginRight: '40px',
    position: 'relative',
    lineHeight: 0,
    alignSelf: 'start',
  },

  imageForReading: {
    display: 'inline-block',
    marginBottom: '20px',
    position: 'relative',
    lineHeight: 0,
    alignSelf: 'start',
  },

  pic: {
    width: '500px',
  },

  scope: {
    position: 'absolute',
    width: '32px',
    bottom: 0,
    left: 468,
    cursor: 'pointer',
  },

  item: {
    flex: 1,
  },

  heading: {
    fontSize: '16px',
    fontFamily: 'PingFangSC-Semibold',
    color: 'rgba(50,54,58,1)',
    lineHeight: '24px',
  },

  instructions: {
    fontSize: '14px',
    fontFamily: 'PingFangSC-Regular',
    color: 'rgba(50,54,58,1)',
    lineHeight: '24px',
    marginTop: '8.4px',
    marginBottom: '40px',
  },

  paragraphClass: {
    lineHeight: '48px',
  },
});
