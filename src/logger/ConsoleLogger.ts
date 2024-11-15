import ILogger from './ILogger';

export default class ConsoleLogger implements ILogger {
  // HEADER = '\x1b[95m'
  // OKBLUE = '\x1b[94m'
  // OKCYAN = '\x1b[96m'
  // OKGREEN = '\x1b[92m'
  // WARNING = '\x1b[93m'
  // FAIL = '\x1b[91m'
  // ENDC = '\x1b[0m'
  // BOLD = '\x1b[1m'
  // UNDERLINE = '\x1b[4m'

  log(message: string) {
    process.stdout.write(message);
  }

  error(message: string) {
    process.stderr.write(`\x1b[91m` + message + `\x1b[0m`);
  }
}
