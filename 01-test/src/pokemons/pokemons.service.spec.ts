import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsService } from './pokemons.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

describe('PokemonsService', () => {
  let service: PokemonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonsService],
    }).compile();

    service = module.get<PokemonsService>(PokemonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a pokemon', async () => {
    const data = { name: 'Pikachu', type: 'Electric' };

    const result = await service.create(data);

    expect(result).toEqual({
      hp: 0,
      id: expect.any(Number),
      name: 'Pikachu',
      sprites: [],
      type: 'Electric',
    });
  });

    it('should find a pokemon with id', async () => {
    const id = 4;
    const result = await service.findOne(id);

    expect(result).toEqual({
      id: 4,
      name: 'charmander',
      type: 'fire',
      hp: 39,
      sprites: [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png',
      ],
    });
  });

    it('should find al the pokemon', async () => {
    const result = await service.findAll({ limit: 1, page: 1 });

    expect(Array.isArray(result)).toBe(true);
  });

  it('should update  the pokemon', async () => {
    const id = 4;
    const dto = new UpdatePokemonDto;
    dto.name = "bulvasor";
    const result = await service.update(id, dto);

    expect(result).toEqual({
      id: 4,
      name: 'bulvasor',
      type: 'fire',
      hp: 39,
      sprites: [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png',
      ],
    });
  });

    it('should update  the pokemon', async () => {
    const pokemon = new Pokemon;
    pokemon.name = "bulbasaur";
    const id = 1;
    const result = await service.remove(id);

    expect(result).toEqual((`Pokemon ${pokemon.name} removed!`));
  });

    it('should throw an error if Pokemon exists', async () => {
    const data = { name: 'Charmander', type: 'Electric' };
    await service.create(data);

    try {
      await service.create(data);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(error.message).toBe(
        `Pokemon with name ${data.name} already exists`,
      );
    }
  });

  it('should return pokemons from cache', async () => {
    const cached = [{ id: 1, name: 'bulbasaur', type: 'grass', hp: 45, sprites: [] }];
    service.paginatedPokemonsCache.set("1-1", cached);

    const result = await service.findAll({ limit: 1, page: 1 });

    expect(result).toEqual(cached);
  });

});