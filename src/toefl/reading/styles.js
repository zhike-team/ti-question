import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  questionWrapper: {
    flex: 1,
    paddingBottom: 20,
  },

  question: {
    float: 'right',
    width: 550,
    paddingRight: 40,
    paddingTop: 35,
    paddingBottom: 40,
    overflow: 'hidden',
  },

  questionOnly: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 1100,
    paddingRight: 0,
  },

  articleWrapper: {
    flex: 1,
    backgroundColor: '#F6F8F9',
  },

  article: {
    flex: 1,
    width: 550,
    marginTop: 35,
    marginBottom: 40,
    paddingLeft: 40,
    paddingRight: 30,
    overflow: 'hidden',
  },

  articleTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },

  questionInsertDirection: {
    display: 'block',
    marginBottom: 20,
  },

  questionInsertDirectionBlock: {
    display: 'inline-block',
    width: 14,
    height: 14,
    marginLeft: 5,
    marginRight: 5,
  },

  questionInsertSentence: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
