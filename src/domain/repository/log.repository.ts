// la palabra reservada abstract evita que se pueda crear una INSTACIA de la clase LogDatasource.

import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

// Sirven para obligar un comportamiento
export abstract class LogRepository {
	abstract saveLog(log: LogEntity): Promise<void>;
	abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
