const path = require('path');

module.exports = {
  title: '   题型组件',
  components: ['src/components/**/*.js'], // 写入对应目录的文档
  ignore: ['src/components/**/styles.js',
    'src/components/audio/index.js',
    'src/components/base/base_follow_up/content/*.js',
    'src/components/ielts/ielts_question/**/*.js',
    'src/components/base/base_follow_up/utils.js',
    'src/components/base/index.js',
    'src/components/ielts/article/**/*.js',
  ],
  theme: {
    baseBackground: '#fdfdfc',
    link: '#274e75',
    linkHover: '#90a7bf',
    border: '#e0d2de',
    font: ['Helvetica', 'sans-serif'],
  },
  styles: {
    Playground: {
      preview: {
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: [[0, 0, 1, 0]],
        borderRadius: 0,
      },
    },
    Markdown: {
      pre: {
        border: 0,
        background: 'none',
      },
      code: {
        fontSize: 14,
      },
    },
  },
  // Override Styleguidist components
  styleguideComponents: {
    LogoRenderer: path.join(__dirname, 'styleguide/components/Logo'),
    SectionsRenderer: path.join(__dirname, 'styleguide/components/SectionsRenderer'),
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules',
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
        },
      ],
    },
    resolve: {
      alias: {
        // Make sure the example uses the local version of react-styleguidist
        // This is only for the examples in this repo, you won't need it for your own project
        // 'react-styleguidist': path.join(__dirname, '../../'),
      },
    },
  },
}
