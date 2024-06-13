export function removeTags(str: string) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}
