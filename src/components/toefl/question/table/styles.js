import { StyleSheet } from 'aphrodite';

import imgRight from '../images/right.png';

export default StyleSheet.create({
  tip: {
    padding: '20px 0',
    backgroundColor: '#FFF8EB',
    textAlign: 'center',
    lineHeight: '22px',
    fontSize: 16,
    letterSpacing: 0,
    color: '#32363A',
  },

  tipP: {
    margin: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },

  table: {
    marginTop: 20,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid #DBE2E6',
    borderRight: 'none',
    borderBottom: 'none',
    textAlign: 'center',
    ':last-of-type': {
      borderBottom: '1px solid #DBE2E6',
    },
  },

  rowHeader: {
    backgroundColor: '#F6F8F9',
  },

  cell: {
    outline: 'none',
    paddingTop: 12,
    paddingBottom: 12,
    borderRight: '1px solid #DBE2E6',
    flex: 1,
  },

  cell2: {
    outline: 'none',
    borderRight: '1px solid #DBE2E6',
    width: 100,
  },

  cellChosen: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: '20px 20px',
    backgroundPosition: 'center center',
    backgroundImage: `url(${imgRight})`,
  },
});
