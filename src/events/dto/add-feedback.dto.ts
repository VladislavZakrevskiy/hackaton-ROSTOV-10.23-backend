import { IsNumber, IsString } from "class-validator";

export class CreateFeedDto {
    @IsNumber()
    score: number;

    @IsString()
    text: string
}