import { CreatePokemonDto } from './../../../src/pokemons/dto/create-pokemon.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../app.e2e-spec';
import { Pokemon } from 'src/pokemons/entities/pokemon.entity';

describe('Pokemons (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true, 
        forbidNonWhitelisted: true, 
    }),
    );

    await app.init();
  });

  it('/pokemons (POST) - with no body', async () => {
    /*return request(app.getHttpServer())
      .post('/pokemons')
      .expect(400)
      .expect('Hello World!');
    */

      const mostHaveErrorMessage = [
        'name must be a string',
        'name should not be empty',
        'type must be a string',
        'type should not be empty'
      ];

      const response = await request(app.getHttpServer()).post('/pokemons');

      const messageArray = response.body.message ?? [];

      expect(response.statusCode).toBe(400);
      expect(mostHaveErrorMessage.length).toEqual(messageArray.length);
      expect(mostHaveErrorMessage).toEqual(expect.arrayContaining(mostHaveErrorMessage));
  });

    it('/pokemons (POST) - with valid body', async () => {

      const dto = new CreatePokemonDto();

      dto.name = "Pikachu";
      dto.type = "Fire";

      const response = await request(app.getHttpServer()).post('/pokemons').send(dto);


      console.log(response.statusCode);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        name: 'Pikachu',
        type: 'Fire',
        id: expect.any(Number),
        hp: 0,
        sprites: []
      });
  });

  it('/pokemons (GET) - should return pagination', async () => {

      const response = await request(app.getHttpServer()).get("/pokemons").query({limit: 5, page: 1});

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(5);

      (response.body as Pokemon[]).forEach((pokemon) => {
        expect(pokemon).toHaveProperty('name');
      })
    });

      it('/pokemons (GET) - return a pokemon', async () => {

      const response = await request(app.getHttpServer()).get("/pokemons/1");

      const pokemon = response.body as Pokemon;

      expect(response.statusCode).toBe(200);
      expect(response.body).toBe(pokemon);
    });

    
      it('/pokemons (GET) - return not found', async () => {

      const response = await request(app.getHttpServer()).get("/pokemons/4444444444");

      console.log(response.body.message);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        message: 'Pokemon with id 4444444444 not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });

   it('/pokemons (UPDATE) - updating pokemon', async () => {
      const response = await request(app.getHttpServer()).patch('/pokemons/2').send({
        name: "Pikachu",
        type: "Fire",
        sprites: []
      });


      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        name: 'Pikachu',
        type: 'Fire',
        id: expect.any(Number),
        hp: 60,
        sprites: []
      });
  });

     it('/pokemons (UPDATE) - throw 404 updating pokemon', async () => {
      const response = await request(app.getHttpServer()).patch('/pokemons/4000').send({
        name: "Pikachu",
        type: "Fire",
        sprites: []
      });


      console.log(response.body);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("Pokemon with id 4000 not found");
  });



    it('/pokemons (DELETE) - delete a pokemon', async () => {

      const response = await request(app.getHttpServer()).delete("/pokemons/1");

      console.log(response);

      expect(response.statusCode).toBe(200);
    });
});
