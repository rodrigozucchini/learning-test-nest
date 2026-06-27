import { UpdatePokemonDto } from './update-pokemon.dto';
import 'reflect-metadata';

import { validate } from "class-validator";

describe('CreatePokemonDto', () => {
*/
    it('hp must be possible as a positive number', async() => {
        const dto = new UpdatePokemonDto();
        dto.hp = -3;

        const errors = await validate(dto);
        const hpError = errors.find((error) => error.property === "hp");

        expect(hpError).toBeDefined();
    })
})