export default class SvgXmlProcessor {
  /**
   * Converts inner xml to compact version
   * If svg consists of one path element, only path data will be returned
   * if svg consists of multiple/other elements, xml will be returned as is
   * <path d="M0 0"/> => M0 0
   */
  public static encode(data: string): string {
    let result = data.replace('\n', '');
    result = result.replace(/\s+/g, ' ');
    result = result.replace(/^\s+/g, '');
    result = result.replace(/\s+$/g, '');
    result = result.replace(/>\s+</g, '><');
    result = result.replace(/,\s+/g, ',');

    const regex = new RegExp('^<path.*?d="(.*?)"/>$', 'ms');
    const match = regex.exec(result);
    if (!match || match[1] === undefined) {
      return result;
    } else {
      return match[1];
    }
  }

  public static decode(viewBox: number[] | number): string {
    if (!viewBox) {
      return '';
    }
    return '';
  }
}
