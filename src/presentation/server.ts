import { url } from 'inspector';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';
import { LogRepositoryImpl } from '../infrastructure/repositories/log-repository.impl';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';

const fileSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDatasource()
);

// Sin implementar un caso de uso
const emailService = new EmailService();

export class ServerApp {
	static start() {
		console.log('Server started...');
		// TODO:Send email
		// new SendEmailLogs(emailService, fileSystemLogRepository).execute(
		// 	'daniprogra91@gmail.com'
		// );
		// emailService.sendEmail({
		// 	to: 'daniprogra91@gmail.com',
		// 	subject: 'Logs de sistema',
		// 	htmlBody: `
		// 	<h2>Hello - NOC </h2>
		// 	<p>lorem ipsum, blablabla</p>
		// 	<p>Ver los logs adjuntos</p>
		// 	`,
		// });

		// TODO: send email with attachments
		// emailService.sendEmailWithFileSystemLogs('daniprogra91@gmail.com');

		//
		// CronService.createJob('*/5 * * * * *', () => {
		// 	const url = 'https://google.com';
		// 	// const url = 'http://localhost:3000/';
		// 	const checkService = new CheckService(
		// 		fileSystemLogRepository,
		// 		() => console.log(`${url} is ok`),
		// 		(error) => console.log(error)
		// 	);
		// 	checkService.execute(url);
		// 	// checkService.execute('http://localhost:3000/');
		// });
	}
}
