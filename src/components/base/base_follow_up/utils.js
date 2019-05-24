/**
 * 该文件的方法精听和跟读都会引用，修改需考虑到兼容性问题
 */
import { get, findIndex } from 'lodash';
import { Utils } from '@zhike/ti-component';

const Parser = Utils.listeningParser;

const parser = new Parser();

// 校验结构是否完整
const checkTranslation = data => {
  let check = true;
  let hasTranslation = true;

  for (const item of data) {
    const keys = Object.keys(item);

    if (!keys.includes('start')) {
      console.log('原译文缺少 start', item);
      check = false;
    } else if (!keys.includes('end')) {
      console.log('原译文缺少 end', item);
      check = false;
    } else if (!keys.includes('raw')) {
      console.log('原译文缺少 raw', item);
      check = false;
    } else if (!keys.includes('translation')) {
      // console.log('原译文缺少 translation', item);
      hasTranslation = false;
    }
  }

  return { check, hasTranslation };
};

// 把练习的数据处理成需要的数据结构
export const handlePractice = ({ practice, listenLimit }) => {
  const listenParts = []; // 材料
  const exampleParts = []; // 范例
  const questionParts = []; // 跟读题型

  const {
    examId, material, name, id, questions, canFollowUp, canIntensiveListening,
  } = practice.data || {};
  // 托福听力材料、托福综合写作材料
  if (examId === 1 && material) {
    const { audios, translation } = material;
    const src = get(audios, '0.src');

    if (src) {
      const text = get(translation, 'paragraphs.0.text') || get(audios, '0.subtitle');
      if (text) {
        const parseText = parser.parse(text, false);
        const { check, hasTranslation } = checkTranslation(parseText);
        if (check) {
          listenParts.push({
            src,
            translation: parseText,
            hasTranslation,
          });
        }
      }
    }
  }

  if (questions && questions.length > 0) {
    questions.forEach(question => {
      // 雅思听力材料、雅思综合写作材料
      const { audioMaterial, audioText } = question.extra || {};
      if (audioText && audioMaterial) {
        const text = get(audioText, 'paragraphs.0.text');
        const src = get(audioMaterial, 'src') || '';
        const name = get(audioMaterial, 'name') || '';
        const isRepeatSrc = findIndex(listenParts, { name });

        if (text && src && isRepeatSrc === -1) {
          const parseText = parser.parse(text, false);
          const { check, hasTranslation } = checkTranslation(parseText);
          if (check) {
            listenParts.push({
              src,
              name,
              translation: parseText,
              hasTranslation,
            });
          }
        }
      }

      // 雅思和托福口语范例音频
      (question.materials || []).forEach(material => {
        (material.examples || []).forEach(example => {
          const text = get(example, 'text.paragraphs.0.text');
          const src = get(example, 'audio.src') || '';

          if (text && src) {
            const parseText = parser.parse(text, false);
            const { check, hasTranslation } = checkTranslation(parseText);
            if (check) {
              exampleParts.push({ // push 到范例音频数组
                src,
                translation: parseText,
                hasTranslation,
              });
            }
          }
        });
      });

      // 雅思和托福跟读题型
      (question.materials || []).forEach(material => {
        const direction = get(material, 'direction.paragraphs.0.text') || '';
        const text = get(material, 'origin.paragraphs.0.text');
        const src = get(material, 'audio.src') || '';
        const status = get(material, 'origin.status') || '';
        const id = get(question, 'id') || '';

        if (text && src) {
          const parseText = parser.parse(text, false);
          const { check, hasTranslation } = checkTranslation(parseText);
          if (check) {
            questionParts.push({ // push 到跟读题型音频数组
              src,
              translation: parseText,
              hasTranslation,
              direction, // 指导语
              hideRaw: status === 'Invisible', // 原文是否可见
              id, // question ID, 报告页便于匹配
            });
          }
        }
      });
    });
  }

  return {
    listenParts: listenLimit ? listenParts.slice(0, listenLimit) : listenParts,
    exampleParts,
    questionParts,
    examId,
    name,
    id,
    canFollowUp: canFollowUp || false,
    canIntensiveListening: canIntensiveListening || false,
  };
};
