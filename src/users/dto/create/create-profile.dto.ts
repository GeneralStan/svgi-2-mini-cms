import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"

export class CreateProfileDto extends CreateBaseAbstractDto{
    readonly homeAddress: string
    readonly Nationality: string
    readonly stateOfOrigin: string
    //readonly photo: string//photo id
}