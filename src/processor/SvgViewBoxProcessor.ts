import ParseError from '../error/ParseError';

export default class SvgViewBoxProcessor {
  /**
   * Converts viewbox attribute to compact value or array
   * 0 0 24 24 => 24
   * 0 0 24 48 => [24, 48]
   */
  public static encode(viewBox: string): number[] | number {
    const result = viewBox.split(' ').map(coord => parseInt(coord));
    if (!Array.isArray(result)) {
      throw new ParseError(`Unable to parse viewBox "${viewBox}"`);
    }

    if (result.length !== 4) {
      throw new ParseError(`Invalid viewBox attribute"${viewBox}"`);
    }

    if (result[0] === 0 && result[1] === 0) {
      if (result[2] === result[3]) {
        return result[2];
      }

      return [result[2], result[3]];
    }

    return result;
  }

  /**
   * Convert compact value of viewbox to string
   * 24 => 0 0 24 24
   * [24, 24] => 0 0 24 24
   */
  public static decode(viewBox: number[] | number): string {
    let result = '';
    if (!viewBox) {
      return result;
    }

    if (Array.isArray(viewBox)) {
      if (viewBox.length === 1) {
        result = `0 0 ${viewBox[0]} ${viewBox[0]}`;
      }
      if (viewBox.length === 2) {
        result = `0 0 ${viewBox[0]} ${viewBox[1]}`;
      }
      if (viewBox.length === 4) {
        result = viewBox.join(' ');
      }
    } else if (typeof viewBox === 'number') {
      result = `0 0 ${viewBox} ${viewBox}`;
    }

    return result;
  }
}
