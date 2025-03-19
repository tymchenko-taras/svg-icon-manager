import ParseError from '../error/ParseError';
import SvgViewBoxProcessor from './SvgViewBoxProcessor';

describe('sgv-icon-manager', () => {
  describe('SvgViewBoxProcessor', () => {
    it('should throw parse error because cant encode invalid viewbox - empty string', () => {
      const t = () => {
        SvgViewBoxProcessor.encode('');
      };
      expect(t).toThrow(ParseError);
    });

    it('should throw parse error because cant encode invalid viewbox - only 3 values', () => {
      const t = () => {
        SvgViewBoxProcessor.encode('12 12 12');
      };
      expect(t).toThrow(ParseError);
    });


    it('should throw parse error because cant encode invalid viewbox - more then 4 values', () => {
      const t = () => {
        SvgViewBoxProcessor.encode('0 0 100 100 100');
      };
      expect(t).toThrow(ParseError);
    });

    it('should return array of two numbers because width and height are different', () => {
      const result = SvgViewBoxProcessor.encode('0 0 88 99');
      expect(result).toEqual([88, 99]);
    });

    it('should return one number because width and height are the same', () => {
      const result = SvgViewBoxProcessor.encode('0 0 100 100');
      expect(result).toEqual(100);
    });

    it('should return one number because width and height are almost the same', () => {
      const result = SvgViewBoxProcessor.encode('0 0 100 100.2');
      expect(result).toEqual(100);
    });

    it('should return all values because min-x is not zero', () => {
      const result = SvgViewBoxProcessor.encode('10 0 100.999 100');
      expect(result).toEqual([10, 0, 100, 100]);
    });

    it('should return all values because min-y is not zero', () => {
      const result = SvgViewBoxProcessor.encode('0 99 100 100.2');
      expect(result).toEqual([0, 99, 100, 100]);
    });
  });
});
