import { type IListItem } from "../lib/core/parseNoOrderList";
import { parseNormalText } from "../lib/core/parseText";
// 正则
export const matchTitle: RegExp = /^(#+)\s(.*)/g,
  matchOrderList = /^\s*(\d+)\.\s(.+)/,
  matchSuperLink = /\[(.*)\]\((.*)\)/,
  matchImage = /!\[(.*)\]\((.*)\)/;

export function processFormat(list: string[]) {
  // 多个换行合并为一个
  if (/^\s+/.test(list[0])) {
    list[0] = list[0].replace(/^(\s+)/g, ($1) => "\n");
  }
  // 如果第一个元素没有换行符 那么就给他加上（后续的判断需要依赖换行符）
  if (!list[0].startsWith("\n")) {
    list[0] = "\n" + list[0];
  }
}
// 有序列表无序列表的生成
export function genTemplateStringOfNodes(nodes: IListItem[], isOrder: boolean) {
  let listString = "";
  for (let node of nodes) {
    let childrenString = node.children.length
      ? genTemplateStringOfNodes(node.children, isOrder)
      : "";
    listString += `<li>${parseNormalText(
      node.value + childrenString,
      true
    )}</li>`;
  }
  return `<${isOrder ? "ol" : "ul"}>${listString}</${isOrder ? "ol" : "ul"}>`;
}

export function isOrderList(s: string) {
  return matchOrderList.test(s);
}

export function isNoOrderList(s: string) {
  let idx = s.indexOf("- ");
  return idx == 0 || (idx != -1 && !s.slice(0, idx).trim());
}

export function isTitle(s: string) {
  return s.trimStart()[0] === "#";
}

export function isImage(s: string) {
  return matchImage.test(s);
}

export function isSuperLink(s: string) {
  return matchSuperLink.test(s);
}

export function isPreCode(s: string) {
  return s.startsWith("```");
}

export function isBLock(s: string) {
  return /^>/.test(s.trim());
}

export function isNeedEndChar(i: number, n: number, ch: string) {
  return i < n - 1 ? ch : "";
}

export function isHTMLTag(s: string) {
  return [
    "span",
    "p",
    "q",
    "ul",
    "li",
    "ol",
    "div",
    "strong",
    "a",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "i",
  ].includes(s);
}
// 暂时写这么多 以后补充...
export function isFile(s: string) {
  return [
    "txt",
    "vue",
    "js",
    "css",
    "html",
    "png",
    "jpg",
    "gif",
    "ts",
    "less",
    "scss",
    "json",
    "md",
  ].includes(s);
}
// 普通数据 上面的匹配条件都没有被匹配到
export function isNormalData(content: string) {
  return (
    !content.includes("<") &&
    !content.includes(")") &&
    !content.includes("(") &&
    !content.includes("{") &&
    !content.includes("}")
  );
}
// 是否是注释节点
export function isComments(s: string) {
  return (
    s.startsWith("//") ||
    s.startsWith("/*") ||
    s.startsWith("*") ||
    s.startsWith("#")
  );
}
// 是否是水平分割线
export function isHorizontalLine(s: string) {
  return s.trim() === "---";
}

export function isFrontChar(i: number, s: string) {
  return i !== 0 ? s : "";
}

export function isTable(s: string) {
  return s.trim()[0] === "|";
}

export function native(s: string) {
  return s.replace(/</g, "&lt;")
}

export function isMultColumnStart(s: string) {
  return s.trim() === "::: start";
}

export function isMultColumnEnd(s: string) {
  return s.trim() === "::: end";
}

export function isMultColumn(s: string) {
  return s.trim() === ':::';
}

export function isHeadLayoutStart(s: string) {
  return s.trim() === "::: headStart";
}

export function isHeadLayoutEnd(s: string) {
  return s.trim() === "::: headEnd"
}

export function isMainLayoutStart(s: string) {
  return s.trim() === "::: mainStart"
}

export function isMainLayoutEnd(s: string) {
  return s.trim() === "::: mainEnd"
}
