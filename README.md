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

### 安装项目依赖，如已安装可跳过

*  基础框架 [React][1] :
```bash
npm install --save react
```
*  CSS-in-JS 框架 [aphrodite][2] :
```bash
npm install --save aphrodite
```
*  题库UI组件库 [ti-UI][3] :
```bash
npm install --save @zhike/ti-ui
```

### 在页面使用需要的组件

```javascript
import React from 'react'
import { Modal } form '@zhike/ti-component'

class MyComponent extends React.Component {
  componentDidMount() {
    Modal.show('ModalAlert', {
      title: 'Alert',
      buttons: [{ title: 'OK' }],
      width: 400,
      isUnhide: true,
      component: (
        <div>Hello World!</div>
      ),
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

### Modal组件改造：
* type, props, [{ Header, AudioPlayer}]
* type为字符串，可选值Alert/Correct。根据传入的字符串匹配Modal内的实例对象，不需要在组件中引入实例并传入Modal
props不变
* Header和AudioPlayer非必选，由组件自行引入，并在必要时传入Modal，以降低耦合度

[1]: https://github.com/facebook/react
[2]: https://github.com/Khan/aphrodite
[3]: https://github.com/zhike-team/ti-UI
