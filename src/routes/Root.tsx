import { Link, Outlet, useLoaderData } from 'react-router-dom';

export interface PokemonType {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
}

interface PokemonsType {
  pokemons: {
    results: PokemonType[];
  };
}

// v6.4 이전에는 couldn't fetch some data before show the page
// now, we can access and fetch the data before we even show the page

export const rootLoader = async (): Promise<PokemonsType> => {
  const results = await fetch('https://pokeapi.co/api/v2/pokemon');
  if (!results.ok) throw new Error('Something went wrong!');
  const pokemons = await results.json();

  return { pokemons };
};

const Root = () => {
  const { pokemons } = useLoaderData() as PokemonsType;
  console.log(pokemons);

  return (
    <>
      <header>
        {pokemons.results.map((pokemon) => (
          <Link
            to={`pokemon/${pokemon.name}`}
            key={pokemon.name}
            style={{ marginRight: 20 }}
          >
            {pokemon.name}
          </Link>
        ))}
      </header>
      <Outlet />
    </>
  );
};

export default Root;
