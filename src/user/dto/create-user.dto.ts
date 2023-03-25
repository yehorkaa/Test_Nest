import { IsEmail, IsEnum, IsString } from 'class-validator';

export enum roles {
	USER = 'user',
	ADMIN = 'admin',
}

export enum states {
	MALE = 'male',
	FEMALE = 'female',
}

export class CreateUserDto {
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
