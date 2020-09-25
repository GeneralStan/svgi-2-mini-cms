import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"
//import { CreateBillingDto } from "../../modules/billings/dto/create-billing.dto"
import { UpdateProfileDto } from "./update-profile.dto"

export class UpdateUserDto extends CreateBaseAbstractDto{
    readonly id: number
    readonly firstName: string
    readonly middelName: string
    readonly lastName: string
    //readonly commonName: string
    readonly gender: string
    readonly dateOfBirth: Date
    readonly isActive: boolean
    readonly primaryEmailAddress: string
    readonly profile: UpdateProfileDto
    //readonly isPrimaryEmailAddressVerified: boolean
    //readonly passwordSalt:string
    //readonly passwordHash:string
    //readonly isPasswordChangeRequired:boolean
    //readonly resetPasswordToken:string
    //readonly resetPasswordExpiration:Date
    //readonly primaryEmailVerificationToken:string
    //readonly otpEnabled:boolean
    //readonly otpSecret: string
    //readonly roles: UpdateRolesDto[]
}