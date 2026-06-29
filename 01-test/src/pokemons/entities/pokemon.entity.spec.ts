import { Pokemon } from './pokemon.entity';
import 'reflect-metadata';

describe('PokemonEntity', () => {
  it('should be valid with correct data', async () => {
    const entity = await new Pokemon();
    entity.id = 1;
    entity.name= "Pokemon";

    expect(typeof entity.id).toBe('number');
    expect(typeof entity.name).toBe('string');
  });
  it('should be valid with correct data', async () => {
    const entity = await new Pokemon();
    entity.id = 1;
    entity.name= "Pokemon";

    expect(entity.name).toBe('Pokemon');  
    });
});