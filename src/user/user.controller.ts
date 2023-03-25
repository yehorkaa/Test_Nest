import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Res,
	HttpStatus,
	Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, roles } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UserController {
	constructor(private readonly Service: UserService) {}

	@Post('create')
	async create(@Body() createDto: CreateUserDto, @Res() res: Response) {
		const data = await this.Service.create(createDto);
		return res.status(HttpStatus.CREATED).json({ data });
	}

	@Get()
	async findAll(@Res() res: Response, @Query('role') role: roles) {
		const data = await this.Service.findAll(role);
		return res.status(HttpStatus.OK).json({ data });
	}

	@Get(':id')
	async findOne(@Param('id') id: string, @Res() res: Response) {
		const data = await this.Service.findOne(id);
		return res.status(HttpStatus.OK).json({ data });
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateDto: UpdateUserDto,
		@Res() res: Response,
	) {
		const data = await this.Service.update(id, updateDto);
		return res.status(HttpStatus.CREATED).json({ data });
	}

	@Delete(':id')
	async remove(@Param('id') id: string, @Res() res: Response) {
		const data = await this.Service.remove(id);
		return res.status(HttpStatus.OK).json({ data });
	}
}
