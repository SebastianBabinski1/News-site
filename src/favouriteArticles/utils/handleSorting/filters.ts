import { Article } from "../../..";

export const compareAscending = (a: Article, b: Article) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

export const compareDescending = (a: Article, b: Article) => {
  if (b.title < a.title) {
    return -1;
  }
  if (b.title > a.title) {
    return 1;
  }
  return 0;
}
