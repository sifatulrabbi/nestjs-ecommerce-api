import { ILogger, IInfo } from '../types';

class Logger implements ILogger {
    private printToConsole(type: 'info' | 'error', info: IInfo): void {
        const printMsg = `[${info.namespace}] [STATUS: ${info.status}] [MESSAGE: ${info.message}]`;
        switch (type) {
            case 'info':
                console.info('INFO:', printMsg, info.object ? info.object : '');
                break;
            case 'error':
                console.error('ERROR:', printMsg, info.object ? info.object : '');
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
