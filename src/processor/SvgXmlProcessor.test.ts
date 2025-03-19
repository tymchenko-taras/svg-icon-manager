import SvgXmlProcessor from './SvgXmlProcessor';

describe('processor', () => {
  describe('SvgXmlProcessor', () => {
    it('should return path', () => {
      const result = SvgXmlProcessor.encode('<path d="AAA"/>');
      expect(result).toEqual(['AAA']);
    });

    it('should return path with closed path tag', () => {
      const result = SvgXmlProcessor.encode('<path d="AAA"></path>');
      expect(result).toEqual(['AAA']);
    });

    it('should return path with dots and spases', () => {
      const result = SvgXmlProcessor.encode('<path d="A. A. A"></path>');
      expect(result).toEqual(['A. A. A']);
    });

    it('should return two pathes', () => {
      const result = SvgXmlProcessor.encode('<path d="AAA"></path><path d="BBB"></path>');
      expect(result).toEqual(['AAA', 'BBB']);
    });

    it('should return two pathes even if they have other attributes', () => {
      const result = SvgXmlProcessor.encode('<path class="test" d="AAA"></path><path d="BBB" stroke="red"></path>');
      expect(result).toEqual(['AAA', 'BBB']);
    });

    it('should return two pathes with different attributes and no closed path tag', () => {
      const result = SvgXmlProcessor.encode('<path class="test" d="AAA"><path d="BBB" stroke="red"></path>');
      expect(result).toEqual(['AAA', 'BBB']);
    });

    it('should return xml because there are tags other than path', () => {
      const result = SvgXmlProcessor.encode(`
        <style type="text/css">
          .st0{fill:#538BDB;}
        </style>
        <path class="a" d="AAA"></path>
        <path d="BBB"></path>
      `);
      expect(result).toEqual(['<style type="text/css"> .st0{fill:#538BDB;} </style><path class="a" d="AAA"></path><path d="BBB"></path>']);
    });
  });
});
