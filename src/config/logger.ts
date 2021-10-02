import { ILogger, IInfo } from '../types';
import colors from 'colors';

class Logger implements ILogger {
    private printToConsole(type: 'info' | 'error', info: IInfo): void {
        const printMsg = `[${colors.green(info.namespace)}] ${colors.yellow(
            `[STATUS: ${info.status}]`
        )} [MESSAGE: ${info.message}]`;
        switch (type) {
            case 'info':
                console.info(
                    colors.blue('INFO:'),
                    printMsg,
                    info.object ? info.object : ''
                );
                break;
            case 'error':
                console.error(
                    colors.red('ERROR:'),
                    printMsg,
                    info.object ? info.object : ''
                );
                break;
        }
    }

    public info(info: IInfo): void {
        this.printToConsole('info', info);
    }
    public error(info: IInfo): void {
        this.printToConsole('error', info);
    }
}

export default new Logger();
