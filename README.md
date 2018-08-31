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
