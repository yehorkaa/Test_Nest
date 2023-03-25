import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//декоратор Controller говори что это контроллер,то есть он нужен для обработки запросов
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}
