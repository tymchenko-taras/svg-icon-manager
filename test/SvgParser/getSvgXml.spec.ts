import { SvgParser } from '../../src';
import ParseError from '../../src/error/ParseError';

describe('index', () => {
  describe('myPackage', () => {
    it('should return empty string if its empty svg', () => {
      const parser = new SvgParser('<svg></svg>');
      const result = parser.getInnerXml();

      expect(result).toEqual('');
    });

    it('should throw parse error because there is no svg tag', () => {
      const t = () => {
        const parser = new SvgParser('<div></div>');
        parser.getInnerXml();
      };
      expect(t).toThrow(ParseError);
    });

    it('should throw parse error because there is an invalid svg tag 1', () => {
      const t = () => {
        const parser = new SvgParser('<svg></svg');
        parser.getInnerXml();
      };
      expect(t).toThrow(ParseError);
    });

    it('should throw parse error because there is and invalid svg tag 2', () => {
      const t = () => {
        const parser1 = new SvgParser('<svg><svg>');
        parser1.getInnerXml();
      };
      expect(t).toThrow(ParseError);
    });

    it('should throw parse error because there is and invalid svg tag 3', () => {
      const t = () => {
        const parser = new SvgParser('<svg>');
        parser.getInnerXml();
      };
      expect(t).toThrow(ParseError);
    });

    it('should return the string inside the svg', () => {
      const parser = new SvgParser('<svg>Aa</svg>');
      const result = parser.getInnerXml();

      expect(result).toEqual('Aa');
    });

    it('should return <path> inside the svg', () => {
      const parser = new SvgParser('<svg><path d="M0 0"/></svg>');
      const result = parser.getInnerXml();

      expect(result).toEqual('<path d="M0 0"/>');
    });

    it('should return <path> inside the svg and strip spaces', () => {
      const parser = new SvgParser('<svg>   <path  d="M0  0"/> </svg>');
      const result = parser.getInnerXml();

      expect(result).toEqual('<path d="M0 0"/>');
    });
  });
});
