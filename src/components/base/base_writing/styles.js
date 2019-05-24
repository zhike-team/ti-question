import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  articleWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: 40,
    paddingBottom: 40,
  },

  article: {
    flex: 1,
    paddingRight: 40,
    width: 550,
    overflowY: 'auto',
  },

  editorWrapper: {
    flex: 1,
    backgroundColor: '#F6F8F9',
    paddingLeft: 40,
    paddingTop: 40,
  },

  editorToolbar: {
    flexDirection: 'row',
    width: 550,
    marginLeft: -10,
  },

  editorToolbarBtn: {
    marginLeft: 10,
  },

  editorToolbarCount: {
    flex: 1,
    fontSize: 12,
    color: '#878F98',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  editorTextarea: {
    flex: 1,
    width: 550,
    marginTop: 10,
    marginBottom: 40,
    padding: 20,
    fontSize: 16,
    border: '1px solid #C3CCD1',
    borderRadius: 3,
  },
});
