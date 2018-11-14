import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 20,
  },

  section: {
    position: 'relative',
    marginTop: 20,
  },

  sectionTitleType: {
    width: 130,
    height: 38,
  },

  sectionTitleDetail: {
    width: 121,
    height: 37,
  },

  choices: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  choice: {
    flexDirection: 'row',
    marginTop: 8,
    width: '25%',
    alignItems: 'center',
    cursor: 'pointer',
  },

  choiceBox: {
    paddingLeft: 16,
    backgroundImage: `url(${require('../../assets/checkbox.png')})`,
    backgroundSize: 16,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left top 4px',
    ':hover': {
      backgroundImage: `url(${require('../../assets/checkbox-hover.png')})`,
    },
  },

  choiceBoxChecked: {
    backgroundImage: `url(${require('../../assets/checkbox-checked.png')})`,
    ':hover': {
      backgroundImage: `url(${require('../../assets/checkbox-checked.png')})`,
    },
  },

  choiceText: {
    marginLeft: 6,
  },

  detail: {
    height: 80,
    marginTop: 10,
    padding: 10,
    border: '1px solid #C3CCD1',
    fontSize: 14,
  },

  detailTip: {
    position: 'absolute',
    fontSize: 12,
    color: '#878F98',
    top: 95,
    right: 10,
    backgroundColor: '#f5f5f5',
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },

  images: {
    flexDirection: 'row',
    marginLeft: -10,
  },

  image: {
    position: 'relative',
    marginTop: 10,
    marginLeft: 10,
  },

  imageShow: {
    height: 60,
    width: 60,
  },

  imageRemove: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 14,
    width: 14,
    cursor: 'pointer',
  },

  imageUpload: {
    marginTop: 10,
    marginLeft: 10,
    height: 60,
    width: 60,
    border: '1px solid #C3CCD1',
    backgroundColor: '#F6F8F9',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },

  imageUploadPlus: {
    width: 12,
    height: 12,
  },

  btn: {
    alignSelf: 'center',
    width: 120,
    height: 40,
    marginTop: 20,
  },

  modalAlert: {
    alignItems: 'center',
  },

  modalAlertImage: {
    width: 85,
    height: 73,
  },

  modalAlertText: {
    marginTop: 20,
  },
});
