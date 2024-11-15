import { SvgParser } from '../../src';

describe('index', () => {
  describe('myPackage', () => {
    it('should return null if there is no viewBox in the svg', () => {
      const parser = new SvgParser('<svg></svg>');
      const result = parser.getSvgViewBox();

      expect(result).toBeNull();
    });

    it('should return array of two numbers because width and height are different', () => {
      const parser = new SvgParser('<svg viewBox="0 0 88 99">  </svg>');
      const result = parser.getSvgViewBox();

      expect(result).toEqual([88, 99]);
    });

    it('should return one number because width and height are the same', () => {
      const parser = new SvgParser('<svg viewBox="0 0 100 100"><path d="M0 0"/>AAA</svg>');
      const result = parser.getSvgViewBox();

      expect(result).toEqual(100);
    });

    it('should return one number because width and height are almost the same', () => {
      const parser = new SvgParser('<svg viewBox="0 0 100 100.2"></svg>');
      const result = parser.getSvgViewBox();

      expect(result).toEqual(100);
    });

    it('should return all values because min-x is not zero', () => {
      const parser = new SvgParser('<svg viewBox="10 0 100.999 100"></svg>');
      const result = parser.getSvgViewBox();

      expect(result).toEqual([10, 0, 100, 100]);
    });

    it('should return all values because min-y is not zero', () => {
      const parser = new SvgParser('<svg viewBox="0 99 100 100.2"></svg>');
      const result = parser.getSvgViewBox();

      expect(result).toEqual([0, 99, 100, 100]);
    });
  });
});
