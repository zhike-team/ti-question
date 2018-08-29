import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  modal: {
    position: 'fixed',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  front: {
    zIndex: 200,
    minWidth: 400,
    backgroundColor: '#fff',
  },

  backdrop: {
    position: 'absolute',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
  },

  header: {
    position: 'relative',
    height: 60,
    backgroundColor: '#F6F9FB',
    borderBottom: '1px solid #EAEFF2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
  },

  close: {
    position: 'absolute',
    right: 24,
    top: 25,
    width: 12,
    height: 13,
    cursor: 'pointer',
  },
});
