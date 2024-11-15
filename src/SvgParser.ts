import ParseError from './error/ParseError';
import SvgViewBoxProcessor from './processor/SvgViewBoxProcessor';
import SvgXmlProcessor from './processor/SvgXmlProcessor';

export default class SvgParser {
  svg:                 string;
  innerXml:            string | undefined = undefined;
  svgViewBoxProcessor: typeof SvgViewBoxProcessor = SvgViewBoxProcessor;
  svgXmlProcessor:     typeof SvgXmlProcessor = SvgXmlProcessor;

  constructor(svg: string) {
    this.svg = svg;
  }

  protected getSvgAttribute(attribute: string): string | null {
    const regex = new RegExp(`<svg.*?${attribute}\s?=\s?"(.*?)"`);
    const match = regex.exec(this.svg);
    if (!match || match[1] === undefined) {
      return null;
    }

    return match[1];
  }

  public getSvgViewBox() {
    const viewBoxStr = this.getSvgAttribute('viewBox');

    if (!viewBoxStr) {
      return '';
    }

    return this.svgViewBoxProcessor.encode(viewBoxStr);
  }

  public getInnerXml(): string {
    if (this.innerXml === undefined) {
      const regex = new RegExp(`<svg.*?>(.*)?<\/svg>`, 'ms');
      const match = regex.exec(this.svg);
      if (!match) {
        throw new ParseError('Unable to find svg tag');
      }

      if (match[1] === undefined) {
        this.innerXml = '';
      } else {
        this.innerXml = this.svgXmlProcessor.encode(match[1]);
      }
    }

    return this.innerXml;
  }
}
