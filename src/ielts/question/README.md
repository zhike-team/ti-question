Renderer
========
富文本渲染引擎

## 目前的问题

- [ ] 无法行内样式叠加。

## 使用

直接引用模块`Article`或者`Question`，参数可以参考`propTypes`

### Article接受的参数
* material: PropTypes.object.isRequired, 对应practice中的material
* question: PropTypes.object, 每一道题目传入
* isTextOnly: PropTypes.bool, 控制是否只显示原文
* handleAnswer: PropTypes.func, 用来保存答案，适用于插入题
* answer: PropTypes.any, 答案记录。

### Question接受的参数
* question: PropTypes.object, 传入题目
* handleAnswer: PropTypes.func.isRequired,  用来保存答案
* answer: PropTypes.any, 答案记录。
* onlyStem: PropTypes.bool, 控制是否只显示题干

## 模块拆分

* Article 负责文章的渲染
* Question 负责题目（指导语、题干、作答区域）的渲染
* Block 负责块的渲染。属于基础模块，Article和Question都会引用
  * 块级样式
  * 行内样式
  * 滚动锚点
* Utils
  * normalize.js 负责数据格式化，把样式（块级/行内）和文本进行整合，为Block提供完整的数据
  * utils.js 有一些帮助方法
  * sampleData 测试数据。
* images 图片资源

## 思路
编辑器没有做inline overlapping styles的支持，所以渲染这边会比较省事。

Block负责行内样式的渲染，行内样式可以根据坐标来对原文进行断句，然后用span + css来包装即可。在`styles.js`文件中，我们定义了以`block`和`inline`为前缀，block或者inline的type组成的样式（比如`inlineHighlight`）。这样我们就能自动根据数据也加在样式

如果日后想要支持行内样式重叠，思路大体如此，只不过需要在数据格式化的时候做更多的工作。

## 行内样式overlapping的思路
要支持overlapping，有两个地方要注意（参考draft.js）
1. 编辑的时候，要把样式对应到每一个字符，即每一个字符都有一个数组来保存应用于其上的样式
2. 保存的时候合并。前端渲染按顺序即可

## 拖拽题的实现

有三种题型涉及到了拖拽
1. 拖拽题
2. 7选5拖拽
3. 排序题

我们使用`react-dnd`来实现拖拽。其核心就是通过改变数据来实现拖拽。
在我们的case中，因为要支持多个区域目标的拖拽，所以在答案的地方使用了数组对象。详情可以参考`drag/index.js`
