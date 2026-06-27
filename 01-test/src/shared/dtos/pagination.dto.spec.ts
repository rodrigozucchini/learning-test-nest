import 'reflect-metadata';

import { validate } from "class-validator";
import { PaginationDto } from "./pagination.dto"
import { plainToInstance } from 'class-transformer';

describe('PaginationDto', () => {
    it('should validate with default values', async() => {
        const dto = new PaginationDto();
        dto.limit = 110;
        dto.page = 11;

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
    })

    it('should validate with default values', async() => {
        const dto = new PaginationDto();
        dto.limit = 10;
        dto.page = 1;

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
    })

    it('should validate with default values', async() => {
        const dto = new PaginationDto();
        dto.limit = 5;
        dto.page = -5;

        const errors = await validate(dto);

        errors.forEach((error) => {
            if(error.property === "page") {
                expect(error.constraints?.min).toBeDefined();
            }
        })
    })

    it('should validate with default values', async() => {
        const dto = new PaginationDto();
        dto.limit = -3;
        dto.page = 1;

        const errors = await validate(dto);

        errors.forEach((error) => {
            if(error.property === "limit") {
                expect(error.constraints?.min).toBeDefined();
            }
        })
    })

    it('should convert strings into numbers', async() => {
        const input = { limit: '10', page: '2'};

        const dto = plainToInstance(PaginationDto, input);

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
        expect(dto.limit).toBe(10);
        expect(dto.page).toBe(2);
    })
})