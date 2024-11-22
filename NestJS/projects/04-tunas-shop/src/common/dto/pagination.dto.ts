import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationDTO {
    
    @IsNumber()
    @IsPositive()
    @IsOptional()    
    offset?: number;

    @IsNumber()
    @IsPositive() 
    @IsOptional()    
    limit?: number;
}