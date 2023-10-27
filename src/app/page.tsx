"use client";

import PokemonCard from "@/components/pokemon-card";
import { capitalizeString } from "@/lib/capitalizeString";
import { pokeapi } from "@/lib/pokeapi";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await pokeapi.get("pokemon");

      setPokemons(response.data.results);
    }

    loadData();
  }, []);

  return (
    <main className="p-2 grid grid-cols-3 gap-2">
      {pokemons.map((pokemon: any, index) => (
        <PokemonCard
          key={pokemon.name}
          id={index + 1}
          pokemon={capitalizeString(pokemon.name)}
        />
      ))}
    </main>
  );
}
