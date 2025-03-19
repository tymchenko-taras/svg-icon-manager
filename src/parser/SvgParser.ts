import ParseError from '../error/ParseError';


export default class SvgParser {
  svg:      string;
  innerXml: string | null | undefined = undefined;


  constructor(svg: string) {
    this.svg = svg;
  }

  public getSvgAttribute(attribute: string): string | null {
    const regex = new RegExp(`<svg.*?${attribute}\s?=\s?"(.*?)"`, `ms`);
    const match = regex.exec(this.svg);
    if (!match || match[1] === undefined) {
      return null;
    }

    return match[1];
  }


  public getRawInnerXml(): string {
    if (this.innerXml === undefined) {
      const regex = new RegExp(`<svg.*?>(.*)?<\/svg>`, 'ms');
      const match = regex.exec(this.svg);
      if (!match) {
        throw new ParseError('Unable to find svg tag');
      }

      if (match[1] === undefined) {
        this.innerXml = '';
      } else {
        this.innerXml = match[1].trim();
      }
    }

    return this.innerXml ?? '';
  }
}
