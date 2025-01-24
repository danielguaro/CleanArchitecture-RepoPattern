import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';

export class LogRepositoryImpl implements LogRepository {
	constructor(
		// La linea a cuntinación es lo mismo q ser recibido como argumento y establecerlo a la propiedad, pero se ahorra unas cuantas lineas de código
		private readonly logDatasource: LogDatasource
	) {}

	async saveLog(log: LogEntity): Promise<void> {
		this.logDatasource.saveLog(log);
	}
	async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		return this.logDatasource.getLogs(severityLevel);
	}
}
