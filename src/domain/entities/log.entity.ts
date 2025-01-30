export enum LogSeverityLevel {
	low = 'low',
	medium = 'medium',
	high = 'high',
}
export interface LogEntityOptions {
	message: string;
	level: LogSeverityLevel;
	origin: string;
	createdAt?: Date;
}

export class LogEntity {
	level: LogSeverityLevel;
	message: string;
	createdAt: Date;
	origin: string;

	constructor(options: LogEntityOptions) {
		const { message, level, origin, createdAt = new Date() } = options;
		this.message = message;
		this.level = level;
		this.createdAt = createdAt;
		this.origin = origin;
	}

	//factory constructor
	static fromJson = (json: string): LogEntity => {
		const { message, level, createdAt, origin }: LogEntity = JSON.parse(json);
		const log = new LogEntity({ message, level, createdAt, origin });

		return log;
	};
}
