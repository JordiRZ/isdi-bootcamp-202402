import Logger from './Logger.mjs';

const logger = new Logger();

function showFeedback(error) {
    logger.error(error);

    alert(error.message);
};

export {
    showFeedback,
    Logger,
    logger
};



