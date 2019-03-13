import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    margin: '0 auto',
    overflow: 'hidden',
  },
  dragMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  dragTip: {
    marginBottom: 20,
    padding: '20px 0',
    backgroundColor: '#FFF8EB',
    textAlign: 'center',
    lineHeight: '22px',
    fontSize: 16,
    letterSpacing: 0,
    color: '#32363A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dragTipP: {
    margin: 0,
    marginTop: 5,
    flexDirection: 'row',
    ':first-child': {
      marginTop: 0,
    },
  },

  dragBold: {
    fontWeight: 'bold',
  },

  dragMoreZones: {
    flex: 1,
  },

  zones: {
    width: '100%',
    margin: '0 auto',
    paddingLeft: 20,
  },

  zonesForOne: {
    width: 700,
    marginTop: 20,
  },

  zonesForSort: {
    paddingLeft: 0,
  },

  zonesTip: {
    fontWeight: 'bold',
  },

  answers: {
    marginTop: 20,
  },

  answersDragMore: {
    margin: '0!important',
    width: 540,
    marginTop: 0,
  },

  answersSort: {
    width: 700,
    margin: 'auto',
    marginTop: 20,
  },

  answersTip: {
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: '24px',
  },

  // for dnd
  zoneContainer: {
    marginBottom: 20,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  zoneText: {
    fontWeight: 'bold',
    marginBottom: 20,
    lineHeight: '24px',
  },

  zone: {
    boxSizing: 'border-box ! important',
    marginTop: 20,
    minHeight: 82,

    ':first-child': {
      marginTop: 0,
    },

    ':nth-child(2)': {
      marginTop: 0,
    },
  },

  zoneDragMore: {
    width: '100% ! important',

    ':nth-child(2)': {
      marginTop: 20,
    },
  },

  zoneOdd: {
    marginLeft: 20,
  },

  zoneForAnswer: {
    width: '100%',

    ':nth-child(2)': {
      marginTop: 20,
    },
  },

  zoneForChoice: {
    width: 540,
    display: 'flex',
  },

  choiceBox: {
    height: '100%',
    width: '100%',
    boxSizing: 'border-box ! important',
  },

  choiceBoxForAnswer: {
    border: '1px solid #C3CCD1',
  },

  choiceBoxForChoice: {
    backgroundColor: '#F6F8F9',
  },

  answerText: {
    cursor: 'move',
    margin: 0,
    padding: 20,
    fontSize: 16,
    color: '#32363A',
    letterSpacing: 0,
  },

  reportItem: {
    position: 'relative',
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    lineHeight: '24px',
    ':last-child': {
      marginBottom: 0,
    },
  },

  reportItemOption: {
    width: 22,
  },

  reportItemText: {
    flex: 1,
    flexWrap: 'wrap',
  },

  reportItemSubStem: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  reportItemSubStemBox: {
    width: 446,
  },

  reportItemSubStems: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
