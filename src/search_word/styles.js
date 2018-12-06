import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({

  content: {
    display: 'none',
    position: 'absolute',
    zIndex: 101,
    width: '280px',
    paddingTop: '20px',
    paddingBottom: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.14)',
  },
  triangle: {
    zIndex: 100,
    display: 'none',
    width: 0,
    height: 0,
    borderWidth: '20px 20px 0  0',
    borderStyle: 'solid',
    borderColor: '#fff #fff transparent transparent ',
    position: 'absolute',
    backgroundColor: 'transparent',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.14)',
    transform: 'rotate(-45deg)',
  },
  triangleMask: {
    zIndex: 102,
    backgroundColor: 'white',
    boxShadow: '0px',
  },
  word: {
    fontSize: '16px',
    fontFamily: 'PingFang-SC-Medium',
    fontWeight: 500,
    color: 'rgba(50,54,58,1)',
    lineHeight: '22px',
  },
  sound: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4px',
  },
  soundMark: {
    marginRight: '8px',
    fontSize: '12px',
    fontFamily: 'PingFang-SC-Medium',
    fontWeight: 500,
    color: 'rgba(135,143,152,1)',
    lineHeight: '17px',
  },
  soundButton: {
    width: 16,
    height: 12,
    backgroundImage: `url(${require('../assets/sound.png')})`,
    backgroundSize: '16px 12px',
    ':hover': {
      backgroundImage: `url(${require('../assets/sound_hover.png')})`,
      backgroundSize: '16px 12px ',
    },
  },
  translate: {
    marginTop: '20px',
    fontSize: '12px',
    fontFamily: 'PingFang-SC-Medium',
    fontWeight: 500,
    color: 'rgba(50,54,58,1)',
    lineHeight: '24px',
  },
  translateList: {
    flexDirection: 'row',
  },
  show: {
    display: 'flex',
  },
  noContent: {
    fontSize: '12px',
    fontFamily: 'PingFang-SC-Medium',
    fontWeight: 500,
    color: 'rgba(50,54,58,1)',
    lineHeight: '24px',
  },

});
