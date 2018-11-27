// 首字母大写
export const firstUpperCase = str => {
  if (!str) return ' ';
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
};

