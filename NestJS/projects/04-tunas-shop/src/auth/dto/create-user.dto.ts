import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDto {

    @IsEmail()
    email: string

    @IsStrongPassword({
        minLength: 1,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    })
    password: string

    @IsString({ each: true })
    @IsOptional()
    @IsIn(['user', 'admin'])
    role?: string[]

    @IsString()
    fullName: string

    @IsBoolean()
    @IsOptional()
    isActive?: boolean

}



