class Logger {
    static DEBUG = 0;
    static INFO = 1;
    static WARN = 2;
    static ERROR = 3;
    static FATAL = 4;
    //   constructor(){
    //     this.level = logger.DEBUG
    //   }
    level = Logger.DEBUG;
    debug(...messages) {
        this.level < Logger.INFO &&
            console.debug(`%c${messages.join(" ")}`, `color: greenyellow`);
    }
    info(...messages) {
        this.level < Logger.WARN &&
            console.info(`%c${messages.join(" ")}`, `color: dodgerblue`);
    }
    warn(...messages) {
        this.level < Logger.ERROR &&
            console.warn(`%c${messages.join(" ")}`, `color: orange`);
    }
    error(...messages) {
        this.level < Logger.FATAL &&
            console.error(`%c${messages.join(" ")}`, `color: tomato`);
    }
    fatal(...messages) {
        console.fatal(
            `%c${messages.join(" ")}`,
            `background-color: red; color: white; padding: 0 .5rem`
        );
    }
}
export default Logger;