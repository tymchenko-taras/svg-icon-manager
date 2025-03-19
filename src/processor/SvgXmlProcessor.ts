export default class SvgXmlProcessor {
  /**
   * Converts inner xml to compact version
   * If svg consists of one path element, only path data will be returned
   * if svg consists of multiple/other elements, xml will be returned as is
   * <path d="M0 0"/> => M0 0
   */
  public static encode(data: string): string[] {
    const result = [];
    let str = data.replace('\n', '');
    str = str.replace(/\s+/g, ' ');
    str = str.replace(/^\s+/g, '');
    str = str.replace(/\s+$/g, '');
    str = str.replace(/>\s+</g, '><');
    str = str.replace(/,\s+/g, ',');

    const regex = new RegExp('<([a-zA-Z]+)[^>d]+(d="(.*?)")?', 'gms');
    const matches = str.matchAll(regex);
    for (const match of matches) {
      const tag = match[1];
      if (tag !== 'path') {
        return [str];
      }
      const data = match[3];
      if (data !== undefined) {
        result.push(data);
      }
    }

    return result;
  }

  public static decode(viewBox: number[] | number): string {
    if (!viewBox) {
      return '';
    }
    return '';
  }
}
