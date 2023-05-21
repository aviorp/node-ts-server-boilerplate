class Logger {
  success(message: string): void {
    console.log('\x1b[32m%s\x1b[0m', '✔️', message);
  }

  error(message: string): void {
    console.log('\x1b[31m%s\x1b[0m', '❌', message);
  }

  info(message: string): void {
    console.log('\x1b[34m%s\x1b[0m', 'ℹ️ ', message);
  }

  warning(message: string): void {
    console.log('\x1b[33m%s\x1b[0m', '⚠️ ', message);
  }
}

export default new Logger();
