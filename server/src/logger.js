import context from "request-context";
import logger from 'simple-node-logger';
import fs from "fs";
import { logDir } from "../config/serverConfig.js";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const options = {
  logDirectory:'./logs', // Директория для хранения логгов (должна существовать)
  fileNamePattern: '<DATE>.log', // Паттерн файла логов
  dateFormat: 'DD.MM.YYYY' // Формат даты
}

const log = logger.createRollingFileLogger(options) // Создание логгера

const logFile = {
  ...log,
  info: (message) => log.info(context.get('uuid'), ' ', message), // Переназначение метода, для автоматического логирования UUID запроса
  error: (message) => log.error(context.get('uuid'), ' ', message),
  fatal: (message) => log.fatal(context.get('uuid'), ' ', message),
}

export default logFile;
