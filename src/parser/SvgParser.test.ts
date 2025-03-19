import { SvgParser } from '../../src';
import ParseError from '../../src/error/ParseError';
import SvgXmlProcessor from '../processor/SvgXmlProcessor';

describe('svg-icon-manager', () => {
  describe('SvgParser', () => {
    it('should return empty string if its empty svg', () => {
      const parser = new SvgParser('<svg></svg>');
      const result = parser.getRawInnerXml();

      expect(result).toEqual('');
    });

    it('should throw parse error because there is no svg tag', () => {
      const t = () => {
        const parser = new SvgParser('<div></div>');
        parser.getRawInnerXml();
      };
      expect(t).toThrow(ParseError);
    });

    it('should throw parse error because there is an invalid svg tag 1', () => {
      const t = () => {
        const parser = new SvgParser('<svg></svg');
        parser.getRawInnerXml();
      };
      expect(t).toThrow(ParseError);
    });

    it('should throw parse error because there is and invalid svg tag 2', () => {
      const t = () => {
        const parser1 = new SvgParser('<svg><svg>');
        parser1.getRawInnerXml();
      };
      expect(t).toThrow(ParseError);
    });

    it('should throw parse error because there is and invalid svg tag 3', () => {
      const t = () => {
        const parser = new SvgParser('<svg>');
        parser.getRawInnerXml();
      };
      expect(t).toThrow(ParseError);
    });

    it('should return raw content inside the svg', () => {
      const parser = new SvgParser('<svg>Aa</svg>');
      const result = parser.getRawInnerXml();

      expect(result).toEqual('Aa');
    });

    it('should return path tag inside the svg', () => {
      const parser = new SvgParser('<svg><path d="M0 0"/></svg>');
      const result = parser.getRawInnerXml();

      expect(result).toEqual('<path d="M0 0"/>');
    });

    it('should return path inside the svg and strip spaces and do not touch spaces inside the path tag', () => {
      const parser = new SvgParser(`<svg>   <path  d="M0  0"/> </svg>`);
      const result = parser.getRawInnerXml();

      expect(result).toEqual('<path  d="M0  0"/>');
    });

    it('should return path inside the svg multiline', () => {
      const parser = new SvgParser(`
        <svg viewBox="0 0 24 24">
    <path d="M0 0"></path>
</svg>
        `);
      const result = parser.getRawInnerXml();

      expect(result).toEqual('<path d="M0 0"></path>');
    });

    it('should return null if there is no viewBox in the svg', () => {
      const parser = new SvgParser('<svg></svg>');
      const result = parser.getSvgAttribute('viewBox');

      expect(result).toBeNull();
    });

    it('should return array of two numbers because width and height are different', () => {
      const parser = new SvgParser('<svg viewBox="0 0 88 99">  </svg>');
      const result = parser.getSvgAttribute('viewBox');

      expect(result).toEqual('0 0 88 99');
    });

    it('should return one number because width and height are the same', () => {
      const parser = new SvgParser('<svg viewBox="0 0 100 100"><path d="M0 0"/>AAA</svg>');
      const result = parser.getSvgAttribute('viewBox');

      expect(result).toEqual('0 0 100 100');
    });

    it('should return one number because width and height are almost the same', () => {
      const parser = new SvgParser('<svg viewBox="0 0 100 100.2"></svg>');
      const result = parser.getSvgAttribute('viewBox');

      expect(result).toEqual('0 0 100 100.2');
    });

    it('should return all values because min-x is not zero', () => {
      const parser = new SvgParser('<svg viewBox="10 0 100.999 100"></svg>');
      const result = parser.getSvgAttribute('viewBox');

      expect(result).toEqual('10 0 100.999 100');
    });

    it('should return all values because min-y is not zero', () => {
      const parser = new SvgParser('<svg viewBox="0 99 100 100.2"></svg>');
      const result = parser.getSvgAttribute('viewBox');

      expect(result).toEqual('0 99 100 100.2');
    });

    it('should return all values multiline', () => {
      const parser = new SvgParser(`
        <?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.8.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 1160 1160" style="enable-background:new 0 0 1160 1160;" xml:space="preserve">
<style type="text/css">
	.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#538BDB;}
	.st1{fill:none;stroke:#FFFFFF;stroke-width:70;stroke-miterlimit:10;}
	.st2{fill:none;stroke:#FFFFFF;stroke-width:100;stroke-miterlimit:10;}
	.st3{fill:#FFFFFF;}
	.st4{display:none;fill:none;stroke:#FFFFFF;stroke-width:150;stroke-miterlimit:10;}
	.st5{fill-rule:evenodd;clip-rule:evenodd;}
</style>
<g id="Dive_Centre_Gray">
	<circle class="st0" cx="580" cy="580" r="580"/>
	<polyline class="st1" points="124.79,475.7 580,189.48 1035.21,475.7 	"/>
	<line class="st2" x1="702.51" y1="955.98" x2="667.82" y2="955.98"/>
	<g>
		<g>
			<path class="st3" d="M899.84,472.59l19.23,19.23c1.84,1.84,3.63,3.72,5.4,5.61V140.38h-74.54v297.23
				C867.22,445.71,884.21,456.96,899.84,472.59z"/>
			<path class="st3" d="M919.06,828.45l-4.3,4.3c-18.85,18.85-40.65,33.92-64.85,44.88v11.96c0,16.05-13.06,29.11-29.11,29.11
				H718.52v74.54h102.29c57.15,0,103.65-46.5,103.65-103.65v-66.75C922.69,824.74,920.9,826.62,919.06,828.45z"/>
		</g>
		<path class="st4" d="M636.71,749.04"/>
		<path class="st4" d="M758.89,822.78"/>
		<path class="st4" d="M636.71,749.04"/>
		<path id="Outline_00000067210248087561494640000005981286527234718125_" class="st1" d="M574.79,491.95h169.18
			c38.69,0,75.8,5.99,103.16,33.35l19.22,19.22c27.36,27.36,42.73,64.47,42.73,103.16v24.9c0,38.69-15.37,75.8-42.73,103.16
			l-4.3,4.3c-27.36,27.36-64.47,42.73-103.16,42.73l0,0c-35.24,0-86.55-11.91-113.94-63.2c-1.49-2.78-4.64-5.36-7.04-8.85
			c-0.39-0.57-0.79-1.13-1.19-1.69c-9.9-13.6-24.48-23.07-40.79-27.18l-19.76-0.75"/>
		<path class="st1" d="M594.59,492.36H416.03c-38.69,0-75.8,5.99-103.16,33.35l-19.22,19.22c-27.36,27.36-42.73,64.47-42.73,103.16
			V673c0,38.69,15.37,75.8,42.73,103.16l4.3,4.3c27.36,27.36,64.47,42.73,103.16,42.73l0,0c35.24,0,86.55-11.91,113.94-63.2
			c1.49-2.78,4.64-5.36,7.04-8.85c0.39-0.57,0.79-1.13,1.19-1.69c9.9-13.6,24.48-23.07,40.79-27.18l19.76-0.75"/>
	</g>
	<circle class="st5" cx="580" cy="580" r="580"/>
	<polyline class="st1" points="124.79,475.7 580,189.48 1035.21,475.7 	"/>
	<line class="st2" x1="702.51" y1="955.98" x2="667.82" y2="955.98"/>
	<g>
		<g>
			<path class="st3" d="M899.84,472.59l19.23,19.23c1.84,1.84,3.63,3.72,5.4,5.61V140.38h-74.54v297.23
				C867.22,445.71,884.21,456.96,899.84,472.59z"/>
			<path class="st3" d="M919.06,828.45l-4.3,4.3c-18.85,18.85-40.65,33.92-64.85,44.88v11.96c0,16.05-13.06,29.11-29.11,29.11
				H718.52v74.54h102.29c57.15,0,103.65-46.5,103.65-103.65v-66.75C922.69,824.74,920.9,826.62,919.06,828.45z"/>
		</g>
		<path class="st4" d="M636.71,749.04"/>
		<path class="st4" d="M758.89,822.78"/>
		<path class="st4" d="M636.71,749.04"/>
		<path id="Outline_00000005966070810858792310000008580172198705247385_" class="st1" d="M574.79,491.95h169.18
			c38.69,0,75.8,5.99,103.16,33.35l19.22,19.22c27.36,27.36,42.73,64.47,42.73,103.16v24.9c0,38.69-15.37,75.8-42.73,103.16
			l-4.3,4.3c-27.36,27.36-64.47,42.73-103.16,42.73l0,0c-35.24,0-86.55-11.91-113.94-63.2c-1.49-2.78-4.64-5.36-7.04-8.85
			c-0.39-0.57-0.79-1.13-1.19-1.69c-9.9-13.6-24.48-23.07-40.79-27.18l-19.76-0.75"/>
		<path class="st1" d="M594.59,492.36H416.03c-38.69,0-75.8,5.99-103.16,33.35l-19.22,19.22c-27.36,27.36-42.73,64.47-42.73,103.16
			V673c0,38.69,15.37,75.8,42.73,103.16l4.3,4.3c27.36,27.36,64.47,42.73,103.16,42.73l0,0c35.24,0,86.55-11.91,113.94-63.2
			c1.49-2.78,4.64-5.36,7.04-8.85c0.39-0.57,0.79-1.13,1.19-1.69c9.9-13.6,24.48-23.07,40.79-27.18l19.76-0.75"/>
	</g>
</g>
</svg>

        `);
      const xml = parser.getRawInnerXml();

      const encoded = SvgXmlProcessor.encode(xml);

      // expect(result).toEqual('0 99 100 100.2');
    });
  });
});
