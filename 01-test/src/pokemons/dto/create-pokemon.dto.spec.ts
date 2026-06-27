import 'reflect-metadata';

import { validate } from "class-validator";
import { CreatePokemonDto } from './create-pokemon.dto';

describe('CreatePokemonDto', () => {
    /*
    it('should validate with correct data', async() => {
        const dto = new CreatePokemonDto();
        dto.name = "Pokemon";
        dto.type = "Tierra";

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
    })

    it('should validate is name not present', async() => {
        const dto = new CreatePokemonDto();
        dto.type = "Tierra";

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
    })

    it('should convert strings into numbers', async() => {
        const input = { name: 1, hp: "2"};

        const dto = plainToInstance(CreatePokemonDto, input);

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
        expect(dto.name).toBe("1");
        expect(dto.hp).toBe(2);
    })
*/
    it('hp must be possible', async() => {
        const dto = new CreatePokemonDto();
        dto.name = "Pokemon";
        dto.type = "Tierra";
        dto.hp = -3;

        const errors = await validate(dto);
        const hpError = errors.find((error) => error.property === "hp");

        expect(hpError).toBeDefined();
    })

        it('sprites number not be possible', async() => {
        const dto = new CreatePokemonDto();
        dto.name = "Pokemon";
        dto.type = "Tierra";
        dto.sprites = [1,2,3] as unknown as string[];

        const errors = await validate(dto);
        const spritesError = errors.find((error) => error.property === "sprites");
        console.log(spritesError);
        expect(spritesError).toBe(undefined);
    })
})