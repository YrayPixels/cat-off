import { IsString, IsInt } from 'class-validator';

export class CreateWalletAddressDto {
    @IsInt()
    readonly user_id: number;

    @IsString()
    readonly address: string;
}
