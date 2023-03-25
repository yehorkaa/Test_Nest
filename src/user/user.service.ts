import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, roles } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from '../libs/prisma';

@Injectable()
export class UserService {
	async create(createDto: CreateUserDto) {
		try {
			const created = await db.user.create({
				data: {
					email: createDto.email,
					userName: createDto.userName,
					role: createDto.role,
					profile: {
						create: {
							firstName: createDto.firstName,
							lastName: createDto.lastName,
							state: createDto.state,
						},
					},
				},
			});
			if (!created)
				throw new HttpException(
					{ data: 'Something went wrong while creating user' },
					HttpStatus.BAD_GATEWAY,
				);
			return created;
		} catch (e) {
			console.log(e);
			throw new HttpException({ data: e }, HttpStatus.BAD_GATEWAY);
		}
	}

	async findAll(role: roles) {
		try {
			if (!role) {
				return await db.user.findMany({
					select: {
						id: true,
						email: true,
						userName: true,
						role: true,
						dataCreate: true,
						profile: true,
					},
				});
			}
			return await db.user.findMany({
				where: {
					role: role,
				},
				select: {
					id: true,
					email: true,
					userName: true,
					role: true,
					dataCreate: true,
					profile: true,
				},
			});
		} catch (e) {
			console.log(e);
			throw new HttpException({ data: e }, HttpStatus.BAD_GATEWAY);
		}
	}

	async findOne(id: string) {
		try {
			return await db.user.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					userName: true,
					email: true,
					role: true,
					dataCreate: true,
					profile: true,
				},
			});
		} catch (e) {
			console.log(e);
			throw new HttpException({ data: e }, HttpStatus.BAD_GATEWAY);
		}
	}

	async update(id: string, updateDto: UpdateUserDto) {
		try {
			return await db.user.update({
				where: {
					id,
				},
				data: {
					email: updateDto.email,
					userName: updateDto.userName,
					role: updateDto.role,
					profile: {
						update: {
							firstName: updateDto.firstName,
							lastName: updateDto.lastName,
							state: updateDto.state,
						},
					},
				},
				select: {
					id: true,
					userName: true,
					email: true,
					role: true,
					dataCreate: true,
					profile: true,
				},
			});
		} catch (e) {
			throw new HttpException({ data: e }, HttpStatus.BAD_GATEWAY);
		}
	}

	async remove(id: string) {
		try {
			return await db.user.delete({
				where: {
					id,
				},
			});
		} catch (e) {
			console.log(e);
			throw new HttpException({ data: e }, HttpStatus.BAD_GATEWAY);
		}
	}
}
