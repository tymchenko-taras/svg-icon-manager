import IPreviewer from './IPreviewer';
import fs from 'fs';


export default class SimplePreviwer implements IPreviewer {
  test(path: string) {
    const data = fs.readFileSync(path, 'utf8');
    const index = data.indexOf('token');
    if (index === -1) {
      throw new Error('Token not found');
    }
  }

  constructor(path: string) {
    const file = fs.openSync(path, 'a');
    const buffer = Buffer.alloc(1024);
    let position = 0;
    const found = false;

    // const data = fs.readFileSync(path, 'utf8');
    // const index = data.indexOf('{content}');
    fs.writeSync(file, Buffer.from('AAA'), 0, 3, 888);
    // console.log({ index });
    fs.closeSync(file);

    return;

    while ((position = fs.readSync(file, buffer, 0, buffer.length, position)) > 0) {
      const index = buffer.toString().lastIndexOf('{content}');
      console.log({ index });
      break;
      // if (index > -1) {
      //   found = true;
      //   position = index;
      //   break;
      // }
    }
    // if (!found) {
    //   throw new Error(`Token "<div class="icons-list">" not found in the file`);
    // }
    // fs.writeSync(file, Buffer.from('AAA'), 0, 3, position);
    // position += 3;
  }

  add(name: string, viewBox: string, xml: string): void {
    // while ((position = fs.readSync(file, buffer, 0, buffer.length, position)) > 0) {
    //   const test = buffer.toString();
    //   console.log({ test });
    // }
  }
}
