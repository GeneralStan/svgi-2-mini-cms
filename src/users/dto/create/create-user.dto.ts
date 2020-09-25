import {IsEmail, IsNotEmpty} from 'class-validator';
import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"
import { CreateProfileDto } from "./create-profile.dto"

export class CreateUserDto extends CreateBaseAbstractDto{
    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly middelName: string

    @IsNotEmpty()
    readonly lastName: string
    //readonly commonName: string

    @IsNotEmpty()
    readonly gender: string

    @IsNotEmpty()
    readonly dateOfBirth: Date

    @IsNotEmpty()
    readonly isActive: boolean

    @IsEmail()
    readonly primaryEmailAddress: string
    
    readonly profile: CreateProfileDto
    /*readonly isPrimaryEmailAddressVerified: boolean
    readonly passwordSalt:string
    readonly passwordHash:string
    readonly isPasswordChangeRequired:boolean
    readonly resetPasswordToken:string
    readonly resetPasswordExpiration:Date
    readonly primaryEmailVerificationToken:string
    readonly otpEnabled:boolean
    readonly otpSecret: string*/
    //readonly roles: CreateRolesDto[]
}