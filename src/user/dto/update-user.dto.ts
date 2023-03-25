import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, roles, states } from './create-user.dto';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsString()
	readonly userName: string;

	@IsEmail()
	readonly email: string;

	@IsString()
	@IsEnum(roles)
	readonly role: roles;

	@IsString()
	readonly firstName: string;

	@IsString()
	readonly lastName: string;

	@IsString()
	@IsEnum(states)
	readonly state: states;
}
