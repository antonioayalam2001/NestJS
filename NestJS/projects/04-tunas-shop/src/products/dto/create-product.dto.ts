import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    @MinLength(2)
    slug?: string
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number

    @IsString()
    type: string
    
    @IsString({ each: true })
    sizes: string[]
    
    @IsString()
    @IsIn(['men','women','kid','unisex'])
    gender: string

    @IsString({ each: true })
    @IsArray()
    tags: string[]

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[]
}
