import { IsOptional,IsNumber,Min } from 'class-validator';
import { Type } from 'class-transformer';


export class PaginationDto {
    
    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    @Min(1)
    page?: number;

    @Min(1)
    limit?: number;
}