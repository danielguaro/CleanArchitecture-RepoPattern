import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachment[];
}

interface Attachment {
	filename: string;
	path: string;
}

// Servicio para mandar correos y a la vez patrón adaptador, para evitar que el Nodemailer este "flotando" por todos lados
export class EmailService {
	private transporter = nodemailer.createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_EMAIL,
			pass: envs.MAILER_SECRET_KEY,
		},
	});

	// Se usará el constructor para determinar si un email es bien mandado o no
	constructor() {}

	async sendEmail(options: SendMailOptions): Promise<boolean> {
		const { to, subject, htmlBody, attachments = [] } = options;

		try {
			const sentInformation = await this.transporter.sendMail({
				to,
				subject,
				html: htmlBody,
				attachments,
			});

			const log = new LogEntity({
				level: LogSeverityLevel.low,
				message: 'Email sent',
				origin: 'email.service.ts',
			});

			return true;
		} catch (error) {
			const log = new LogEntity({
				level: LogSeverityLevel.high,
				message: `Email not sent error - ${error}`,
				origin: 'email.service.ts',
			});

			return false;
		}
	}

	// Para enviar archivos adjuntos
	async sendEmailWithFileSystemLogs(to: string | string[]) {
		const subject = 'Logs del servidor';
		const htmlBody = `
			<h2>Logs del sistema - NOC </h2>
			<p>Esto es un test de lo que será un archivo adjunto</p>
			<p>Ver los logs adjuntos</p>
		 `;
		const attachments: Attachment[] = [
			{
				filename: 'logs-all.log',
				path: './logs/logs-all.log',
			},
			{
				filename: 'logs-high.log',
				path: './logs/logs-high.log',
			},
			{
				filename: 'logs-medium.log',
				path: './logs/logs-medium.log',
			},
		];

		return this.sendEmail({ to, subject, htmlBody, attachments });
	}
}
