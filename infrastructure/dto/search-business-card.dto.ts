import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class SearchBusinessCardDTO {
    @IsString()
    @Expose({ name: 'name' })
    @IsOptional()
    name: string;

    @IsString()
    @Expose({ name: 'job_title' })
    @IsOptional()
    jobTitle: string;
}