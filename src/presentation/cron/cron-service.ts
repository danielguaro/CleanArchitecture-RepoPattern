import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
	static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
		//Definir tareas que se ejecuten en ciertos tiempos con la librería Cron
		const job = new CronJob(cronTime, onTick);
		job.start(); // is optional here because of the fourth parameter set to true.

		return job;
	}
}
