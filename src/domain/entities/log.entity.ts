export enum LogSeverityLevel {
	low = 'low',
	medium = 'medium',
	high = 'high',
}

export class LogEntity {
	level: LogSeverityLevel;
	message: string;
	createdAt: Date;

	constructor(message: string, level: LogSeverityLevel) {
		this.message = message;
		this.level = level;
		this.createdAt = new Date();
	}

	//factory constructor
	static fromJson = (json: string): LogEntity => {
		const { message, level, createdAt }: LogEntity = JSON.parse(json);
		const log = new LogEntity(message, level);
		log.createdAt = new Date(createdAt);
		return log;
	};
}
