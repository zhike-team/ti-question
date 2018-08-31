import axios from 'axios';
import FormData from 'form-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { concat, filter } from 'lodash';
import { View, Image, Textarea, Button } from '@zhike/ti-ui';
import { version } from 'common/config';
import { createPromise } from 'utils/action';
import Modal from 'components/modal';
import ModalAlert from 'components/modal/alert';
import styles from './styles';

export default class ModalComponent extends Component {
  // 参数
  static propTypes = {
    modalId: PropTypes.string.isRequired,
    getUploadSignature: PropTypes.func.isRequired,
    postCorrection: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      choices: [],
      detail: '',
      files: [],
      filesUrl: [],
    };
  }

  // 选择选项
  toggleChoice(choice) {
    const { choices } = this.state;

    if (choices.indexOf(choice) !== -1) {
      this.setState({
        choices: filter(choices, item => item !== choice),
      });
    } else {
      this.setState({
        choices: concat(choices, choice),
      });
    }
  }

  // 文字修改
  handleDetailChange(e) {
    this.setState({
      detail: e.target.value.substr(0, 300),
    });
  }

  // 选择文件
  selectFile() {
    this.fileInput.click();
  }

  // 文件变化
  fileChange(event) {
    const file = event.target.files[0];
    this.setState({
      files: this.state.files.concat([file]),
    });

    const reader = new FileReader(); // eslint-disable-line
    reader.readAsDataURL(file);
    reader.onload = e => {
      this.setState({
        filesUrl: this.state.filesUrl.concat([e.target.result]),
      });
    };

    this.fileInput.value = '';
  }

  // 删除文件
  removeFile(index) {
    this.setState({
      files: filter(this.state.files, (f, i) => i !== index),
      filesUrl: filter(this.state.filesUrl, (f, i) => i !== index),
    });
  }

  // 提交表单
  async submit() {
    const {
      modalId, getUploadSignature, option,
      postCorrection, step, isReport,
    } = this.props;
    const { choices, detail, files } = this.state;

    this.setState({
      submitting: true,
    });

    // 上传图片
    const images = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        try {
          const signature = await createPromise(getUploadSignature, {
            business: 'tiku/correction',
            fileName: file.name,
          });

          const formData = new FormData();
          formData.append('key', signature.data.key);
          formData.append('policy', signature.data.policy);
          formData.append('OSSAccessKeyId', signature.data.accessKeyId);
          formData.append('signature', signature.data.signature);
          formData.append('callback', signature.data.callback);
          formData.append('file', file);

          const imgData = await axios({
            url: signature.data.uploadAddress,
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: formData,
            timeout: 20000,
          });

          images.push({
            src: imgData.data.code === 0 ? imgData.data.data.url : `${signature.data.uploadAddress}/${signature.data.key}`,
          });
        } catch (e) {
          Modal.show(ModalAlert, {
            title: '错误',
            buttons: [{ title: 'OK' }],
            width: 400,
            isReport,
            component: (
              <View className={styles.modalAlert}>
                上传图片出现错误，请刷新重试
              </View>
            ),
          });
          // console.log(e);
          this.setState({
            submitting: false,
          });
          return;
        }
      }
    }

    // 上传纠错信息
    const form = {
      type: choices,
      referenceName: step.question ? step.question.name : step.practice.name,
      referenceType: step.question ? 'Question' : 'Practice',
      referenceId: step.question ? step.question.id : step.practice.id,
      images,
      detail,
      status: 'Pending',
      remark: '',
      source: 'ti-base',
      version,
      ...option,
    };

    postCorrection(form);
    Modal.hide(modalId);

    // 弹出成功提示
    setTimeout(() => {
      Modal.show(ModalAlert, {
        title: '提交成功',
        buttons: [{ title: 'OK' }],
        width: 400,
        isReport,
        component: (
          /* eslint-disable */
          <View className={styles.modalAlert}>
            <Image
              className={styles.modalAlertImage}
              src={require('./assets/ok.png')}
            />
            <View className={styles.modalAlertText}>
              你的反馈我们会认真查看并完善，感谢你对智课一如既往的支持呦~
            </View>
          </View>
          /* eslint-enable */
        ),
      });
    }, 50);
  }

  // 渲染
  render() {
    const { choices, detail, submitting, filesUrl } = this.state;
    const allChoices = [
      {
        type: 'ReadingOriginal',
        text: '听力原文有误',
      },

      {
        type: 'Stem',
        text: '题干有误',
      },

      {
        type: 'Choices',
        text: '选项有误',
      },

      {
        type: 'Answer',
        text: '答案有误',
      },

      {
        type: 'Analysis',
        text: '文字解析有误',
      },

      {
        type: 'ListeningOriginal',
        text: '听力音频有误',
      },

      {
        type: 'ReadingTranslation',
        text: '阅读译文有误',
      },

      {
        type: 'PageStyle',
        text: '页面显示有误',
      },

      {
        type: 'Other',
        text: '其它',
      },
    ];

    return (
      <View className={styles.container}>
        <View className={styles.section}>
          <Image
            className={styles.sectionTitleType}
            src={require('./assets/title_type.png')}
          />
          <View className={styles.choices}>
            {allChoices.map(choice => (
              <View
                key={choice.type}
                className={[
                  styles.choice,
                  styles.choiceBox,
                  choices.indexOf(choice.type) !== -1
                    ? styles.choiceBoxChecked
                    : undefined,
                ]}
                onClick={() => this.toggleChoice(choice.type)}
              >
                <View className={styles.choiceText}>{choice.text}</View>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.section}>
          <Image
            className={styles.sectionTitleDetail}
            src={require('./assets/title_detail.png')}
          />

          <Textarea
            className={styles.detail}
            placeholder="将问题描述清楚，处理更及时哦~"
            value={detail}
            onChange={e => this.handleDetailChange(e)}
          />
          <View className={styles.detailTip}>{detail.length}/300</View>

          <View className={styles.images}>
            {
              filesUrl.map((fileUrl, index) => (
                <View key={index} className={styles.image}>
                  <Image
                    className={styles.imageShow}
                    src={fileUrl}
                  />

                  <Image
                    className={styles.imageRemove}
                    src={require('./assets/remove.png')}
                    onClick={() => this.removeFile(index)}
                  />
                </View>
              ))
            }

            {
              filesUrl.length < 3 &&
              <View
                className={styles.imageUpload}
                onClick={() => this.selectFile()}
              >
                <Image
                  className={styles.imageUploadPlus}
                  src={require('./assets/plus.png')}
                />
              </View>
            }
          </View>
        </View>

        <Button
          className={styles.btn}
          text="提交"
          onClick={() => this.submit()}
          isAvailable={!submitting && choices.length > 0}
        />

        <input
          ref={fileInput => { this.fileInput = fileInput; }}
          type="file"
          style={{ display: 'none' }}
          onChange={event => this.fileChange(event)}
        />
      </View>
    );
  }
}
