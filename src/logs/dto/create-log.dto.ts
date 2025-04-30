import { IsString } from 'class-validator';
export class CreateLogDto {
    @IsString()
    readonly method: string;
    @IsString()
    readonly body :string;
    @IsString()
    readonly url:string
}
