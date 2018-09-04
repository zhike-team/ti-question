# ti-component
题库的通用组件，提取为依赖库并统一发布在npm

## demo

```bash
npm install
npm run storybook
open http://localhost:3002/
```

## 使用指南

### 安装

```bash
npm install --save @zhike/ti-component
```

### 安装项目同级依赖，缺少依赖会触发npm警告，如已安装可跳过

```bash
npm install --save react aphrodite axios lodash form-data @zhike/ti-ui
```

### 在页面使用需要的组件

```javascript
import React from 'react'
import { Modal } form '@zhike/ti-component'
import Header from 'xxx'
import AudioPlayer from 'xxx'

class MyComponent extends React.Component {
  componentDidMount() {
    Modal.show('ModalAlert', {
      title: 'Alert',
      buttons: [{ title: 'OK' }],
      width: 400,
      isUnhide: true,
      isReport: false,
      component: (
        <div>Hello World!</div>
      ),
    },
    onShow: () => {
      AudioPlayer.pause();
      Header.pauseTimerForModal();
    },
    onShow: () => {
      Header.startTimerForModal();
      AudioPlayer.resume();
    });
  }
}

export default MyComponent
```

## 开发指南

1. 修改`package.json`文件的版本号
2. 打包到`lib`文件夹并发布

```bash
npm run build
npm publish
```

## API

### `Audio`组件改造：
* 调用该组件需要在`props`中传入`cdnUrl`字段，请从common/config引用

### `Modal`组件改造：
* `type, props, onShow, onHide`
* `type`为字符串，可选值`'ModalAlert'`或`'ModalCorrect'`。根据传入的字符串匹配`Modal`内的实例对象，以后不需要在组件中引入实例
* 若`type`为`Correct`， 则`props`需要再传入一个`option`对象，用于上传纠错信息时添加自定义属性。必传值：
```javascript
{
  version: '1.0.0', // 请从common/config引用version字段
  source: 'ti-base', // ti-base/ti-toefl/...
}
```
* 新增加的`onShow/onHide`是为了降低耦合度，在抽离的组件中减少不合理的引用
* `onShow`(可选)，在`isReport`为`false`的时候执行，一般情况下，传入以下方法：
```javascript
() => {
  AudioPlayer.pause();
  Header.pauseTimerForModal();
}
```
* `onHide`(可选)，在`isReport`为`false`，且`Modal`全部关闭后执行，一般情况下，传入以下方法：
```javascript
() => {
  Header.startTimerForModal();
  AudioPlayer.resume();
}
```

### `Recorder`组件改造：
* `start`方法接收一个对象参数`{callback, mode, skip}`
* `callback`方法为启动成功后的回调函数，默认空函数
* `mode/skip`非必填，会在启动失败时用到，`mode`为字符串，`skip`为函数。如果启动失败，判断`mode === 'mock'`，如果为`true`，则会在弹窗提示中添加一个“跳过口语”的按钮，点击触发`skip`方法


### `Article`组件：
##### 富文本渲染组件， 支持athene后台，插入的题库专用的富文本结构， 支持的富文本结构如下：
```javascript
{
    "paragraphs": [
        {
            "id": "b4d07a69-1207-6570-9a62-05d5051484c2",
            "text": "Dreamtime travel agency",
            "type": "Text"
        },
        {
            "id": "cefc2a71-0d89-1411-016b-f08ccd455752",
            "text": "Tour information",
            "type": "Text"
        },
        {
            "id": "69867f02-f19f-4c19-1d69-65a06d5b29d0",
            "text": " Example Answer",
            "type": "Text"
        },
        {
            "id": "2a887672-9f06-749a-5947-e9d539b224a8",
            "text": "Holiday name Whale Watch Experience",
            "type": "Text"
        },
        {
            "id": "b51aaffa-4e0b-fc8f-6f8c-dfb1f40e7862",
            "text": "Holiday length 2 days",
            "type": "Text"
        },
    ],
    "inlineMarkup": [
        {
            "pid": "b51aaffa-4e0b-fc8f-6f8c-dfb1f40e7862",
            "type": "BlankTable",
            "index": 17,
            "length": 4
        },
        {
            "pid": "b4d07a69-1207-6570-9a62-05d5051484c2",
            "type": "FontSize",
            "index": 0,
            "value": "h1",
            "length": 23
        },
        {
            "pid": "cefc2a71-0d89-1411-016b-f08ccd455752",
            "type": "FontSize",
            "index": 0,
            "value": "h2",
            "length": 16
        },
        {
            "pid": "69867f02-f19f-4c19-1d69-65a06d5b29d0",
            "type": "Bold",
            "index": 1,
            "length": 40
        },
    ],
    "articleMarkup": {},
    "paragraphMarkup": [
        {
            "pid": "b4d07a69-1207-6570-9a62-05d5051484c2",
            "type": "Align",
            "value": "center"
        },
        {
            "pid": "cefc2a71-0d89-1411-016b-f08ccd455752",
            "type": "Align",
            "value": "center"
        }
    ]
}


```
#### 用于富文本的解析及渲染，
* `Article` 首先处理富文本段落，将段落进行分段处理，每段有对应的行内样式(表格题,填空题, 拖拽题),还有对应的段落样式（缩进，加粗，斜体，下划线， 字体大小）,在段落中插入的（图片Image && 音频 Audio资源）
* 内部的`Block`组件，实现每个段落的样式渲染；
* `isTextOnly` 是否只有文本，则不具有行内样式和段落样式
* `handleAnswer` 处理一些题目答案的回调函数
* `isReport` 是否是报告页，报告页与答题页样式渲染有差异
* `location` 托福题库中使用，切换页面时，富文本滑动定位到顶部
* `question` 习题， 雅思在线练习，需要将多个变量进行合并
* `answer` 数组，填空题，表格题，拖拽题用户的答案，用于报告页的渲染
* `progressWidth` 需要显示的 音频播放器Audio的宽度

