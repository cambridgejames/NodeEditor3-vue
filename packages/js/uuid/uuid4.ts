const DEFAULT_VALUE = "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx";
const DEFAULT_ELEMENT = "x";

const SEARCH_REG = /[xy]/g;

/**
 * 从原始字符串中替换随机字符
 *
 * @param inputChar 字符串中的字符
 * @return 替换后的字符
 */
const replace = (inputChar: string): string => {
  const randomValue = Math.random() * 16 | 0;
  const solution = inputChar === DEFAULT_ELEMENT ? randomValue : (randomValue & 0x3 | 0x8);
  return solution.toString(16);
};

/**
 * 创建UUID4
 *
 * @return UUID4
 */
const create = (): string => {
  return DEFAULT_VALUE.replace(SEARCH_REG, replace);
};

export default {
  create
};
