import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    marginTop: 40,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'colunm',
    flexWrap: 'wrap',
    overflowX: 'auto',
  },

  image: {
    display: 'inline-block',
    marginRight: '40px',
  },

  pic: {
    width: '500px',
  },

  item: {
    paddingBottom: 40,
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
  },

  table: {
    boxSizing: 'border-box',
    width: '1100px',
    height: '40px',
    textAlign: 'left',
    fontSize: '16px',
    fontFamily: 'PingFangSC-Regular',
    color: 'rgba(50,54,58,1)',
    lineHeight: '24px',
    borderSpacing: '0px',
    borderPadding: '0px',
    borderCollapse: 'collapse',
  },

  tbody: {
    boxSizing: 'border-box',
    maxWidth: '1100px',
  },

  tableCell: {
    border: '1px solid rgba(195,204,209,1)',
    padding: '32px 20px',
    fontWeight: 'normal',
  },

  paragraphClass: {
    lineHeight: '48px',
  },
});
