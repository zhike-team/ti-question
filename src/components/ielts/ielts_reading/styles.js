import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
  },

  articleWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#F6F8F9',
  },

  article: {
    width: 550,
    paddingTop: 40,
    overflowY: 'auto',
  },
  articleContent: {
    width: '550px',
    paddingRight: 40,
    paddingBottom: 40,
  },

  articleTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },

  questionWrapper: {
    flex: 1,
  },

  questions: {
    flex: 1,
    width: 550,
    paddingTop: 40,
    paddingLeft: 40,
    // overflowY: 'auto',
  },

  question: {
    width: 510,
    marginTop: 40,
    borderBottom: '1px solid rgba(195,204,209,1)',
    paddingBottom: '40px',
    ':last-child': {
      borderBottom: 'none',
    },
    ':first-child': {
      marginTop: 0,
    },
  },
});
