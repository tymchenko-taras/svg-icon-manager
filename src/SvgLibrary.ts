import fs from 'fs/promises';
import SvgParser from './parser/SvgParser';
import ParseError from './error/ParseError';
import ILogger from './logger/ILogger';
import ConsoleLogger from './logger/ConsoleLogger';
import IPreviewer from './previewer/IPreviewer';
import SimplePreviwer from './previewer/SimplePreviwer';
import { JSONObject } from './type/json';
import SvgXmlProcessor from './processor/SvgXmlProcessor';
import SvgViewBoxProcessor from './processor/SvgViewBoxProcessor';

const defaultOptions = {
  svgDirectory:          './svg',
  configPath:            './_config.json',
  previewerTemplatePath: 'how to use html file from library, ',
  previewerOutputPath:   './preview.html',
  logger:                new ConsoleLogger(),
  parser:                SvgParser,
};

export default class SvgLibrary {
  private svgDirectory: string;
  private configPath:   string;
  private logger:       ILogger;
  private parser:       typeof SvgParser;
  private previewer:    IPreviewer;

  constructor(options = {}) {
    const _options = { ...defaultOptions, ...options };
    this.svgDirectory = _options.svgDirectory;
    if (!this.svgDirectory) {
      throw new Error('svgDirectory is required');
    }

    this.configPath = _options.configPath;
    if (!this.configPath) {
      throw new Error('configPath is required');
    }

    this.logger = _options.logger;
    if (!this.logger) {
      throw new Error('logger is required');
    }

    this.parser = _options.parser;
    if (!this.parser) {
      throw new Error('parser is required');
    }

    if (!_options.previewerTemplatePath) {
      throw new Error('previewerTemplatePath is required');
    }
    if (!_options.previewerOutputPath) {
      throw new Error('previewerOutputPath is required');
    }
    this.previewer = new SimplePreviwer(_options.previewerTemplatePath, _options.previewerOutputPath);
  }

  public build = async () => {
    const config: JSONObject = {};
    const files = await fs.readdir(this.svgDirectory);

    for (const file of files) {
      try {
        this.logger.log(`\nParsing "${file}"... `);
        const iconName = file.replace('.svg', '');
        const svgContent = await fs.readFile(`${this.svgDirectory}/${file}`, 'utf8');
        const parser = new this.parser(svgContent);

        const rawViewBox = parser.getSvgAttribute('viewBox');
        if (!rawViewBox) {
          throw new ParseError('Unable to find viewBox attribute');
        }

        const viewBox = SvgViewBoxProcessor.encode(rawViewBox);
        if (!viewBox) {
          throw new ParseError('Unable to process viewBox attribute');
        }

        const rawXml = parser.getRawInnerXml();
        if (!rawXml) {
          throw new ParseError('Unable to get raw xml of the svg tag');
        }

        const xmlEncoded = SvgXmlProcessor.encode(rawXml);
        if (!xmlEncoded) {
          throw new ParseError('Unable to process xml of the svg tag');
        }

        config[iconName] = [viewBox, ...xmlEncoded];
        this.logger.log(`Success`);
        // this.previewer.add(iconName, viewBox, xml);
      } catch (e) {
        if (e instanceof ParseError) {
          this.logger.error(`Unable to parse "${file}": "${e.message}" - Skipping...`);
        } else {
          this.logger.error(`Unable to parse "${file}": "${e}" - Skipping...`);
        }
      }
    }

    await fs.writeFile(this.configPath, JSON.stringify(config, null, 2));
    this.logger.log(`\nDone! BB`);
  };
}
