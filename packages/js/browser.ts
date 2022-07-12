/**
 * 浏览器类型
 */
export enum BROWSER {
  IE = "IE",
  FIREFOX = "FIREFOX",
  OPERA = "OPERA",
  CHROME = "CHROME",
  SAFARI = "SAFARI"
}

/**
 * 浏览器内核类型
 */
export enum KERNEL {
  TRIDENT = "TRIDENT",
  WEBKIT = "WEBKIT",
  GECKO = "GECKO",
  PRESTO = "PRESTO"
}

/**
 * 用于浏览器类型匹配的正则表达式
 */
const BROWSER_REG_MAP: {[key in BROWSER]: RegExp} = {
  [BROWSER.IE]: /\b(?:msie |ie |trident\/\d.*rv[ :])([\d.]+)/,
  [BROWSER.FIREFOX]: /\bfirefox\/([\d.ab]+)/,
  [BROWSER.OPERA]: /\bopr\/([\d.]+)/,
  [BROWSER.CHROME]: / (?:chrome|crios|crmo)\/([\d.]+)/,
  [BROWSER.SAFARI]: /\bversion\/([\d.]+(?: beta)?)(?: mobile(?:\/[a-z\d]+)?)? safari\//
};

/**
 * 用于浏览器内核类型匹配的正则表达式
 */
const KERNEL_REG_MAP: {[key in KERNEL]: RegExp} = {
  [KERNEL.TRIDENT]: /\b(?:msie |ie |trident\/\d.*rv[ :])([\d.]+)/,
  [KERNEL.WEBKIT]: /\bapplewebkit\/?([\d.+]+)/,
  [KERNEL.GECKO]: /\bgecko\/(\d+)/,
  [KERNEL.PRESTO]: /\bpresto\/([\d.]+)/
};

const DEFAULT_RESULT = "UNKNOWN";

/**
 * 匹配方法
 *
 * @param client 待匹配的类型
 * @param userAgent 用户代理
 * @return 匹配结果
 */
const detect = (client: {[key: string]: RegExp}, userAgent: string): string => {
  for (const clientKey in client) {
    if (client[clientKey].test(userAgent)) {
      return clientKey.toString();
    }
  }
  return DEFAULT_RESULT;
};

/**
 * 带默认值的匹配方法
 *
 * @param client 待匹配的类型
 * @param userAgent 用户代理
 * @param defaultValue 默认值
 * @return 匹配结果
 */
const detectWithDefault = (client: {[key: string]: RegExp}, userAgent: string, defaultValue: string = DEFAULT_RESULT): string => {
  const result = detect(client, userAgent);
  return result === DEFAULT_RESULT ? defaultValue : result;
};

/**
 * 浏览器及内核类型类
 */
export interface BrowserType {
  browser: string // 浏览器类型
  kernel: string // 浏览器内核类型
}

/**
 * 获取浏览器及内核类型
 *
 * @return 浏览器及内核类型
 */
export const getBrowser = (): BrowserType => {
  const userAgent = navigator.userAgent.toLowerCase();
  return {
    browser: detectWithDefault(BROWSER_REG_MAP, userAgent, BROWSER.CHROME),
    kernel: detectWithDefault(KERNEL_REG_MAP, userAgent, KERNEL.WEBKIT)
  };
};
