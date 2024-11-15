import fs from 'fs/promises';
import SvgParser from './SvgParser';
import ParseError from './error/ParseError';
import ILogger from './logger/ILogger';
import ConsoleLogger from './logger/ConsoleLogger';

type JSONSvgViewBox = number[] | number | string;
type JSONXml = string;

interface JSONObject {
  [x: string]: [JSONSvgViewBox, JSONXml]
}

export default class SvgLibrary {
  private directory:  string;
  private configPath: string;
  private logger:     ILogger = new ConsoleLogger();
  private parser:     typeof SvgParser = SvgParser;
  private previewer:  typeof SvgParser = SvgParser;

  constructor(directory: string, configPath: string) {
    this.directory = directory;
    this.configPath = configPath;
  }

  public buildConfig = async () => {
    const config: JSONObject = {};
    const files = await fs.readdir(this.directory);

    for (const file of files) {
      try {
        this.logger.log(`\nParsing "${file}"... `);
        const iconName = file.replace('.svg', '');
        const svgContent = await fs.readFile(`${this.directory}/${file}`, 'utf8');
        const parser = new this.parser(svgContent);
        const viewBox = parser.getSvgViewBox();
        const xml = parser.getInnerXml();

        if (!xml) {
          throw new ParseError('Unable to parse empty svg tag');
        }
        config[iconName] = [viewBox, xml];
        this.logger.log(`Success`);
        this.previewer.addIcon(iconName, viewBox, xml);
      } catch (e) {
        if (e instanceof ParseError) {
          this.logger.error(`Unable to parse "${file}": "${e.message}" - Skipping...`);
        } else {
          this.logger.error(`Unable to parse "${file}": "${e}" - Skipping...`);
        }
      }
    }

    await fs.writeFile(this.configPath, JSON.stringify(config, null, 2));
    this.logger.log(`\nDone!`);
  };
}
