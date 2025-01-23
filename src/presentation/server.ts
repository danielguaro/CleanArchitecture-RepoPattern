import { url } from 'inspector';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';

export class ServerApp {
	static start() {
		console.log('Server started...');
		CronService.createJob('*/5 * * * * *', () => {
			const url = 'https://google.com';
			const checkService = new CheckService(
				() => console.log(`${url} is ok`),
				(error) => console.log(error)
			);
			checkService.execute(url);
			// checkService.execute('http://localhost:3000/');
		});
	}
}
