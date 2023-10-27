"use client";

import PokemonCard from "@/components/pokemon-card";
import { NamedAPIResource, PokemonClient } from "pokenode-ts";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemons, setPokemons] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    async function loadData() {
      const pokeClient = new PokemonClient();
      const response = await pokeClient.listPokemons();

      setPokemons(response.results);
    }

    loadData();
  }, []);

  return (
    <main className="p-2 grid grid-cols-3 gap-2">
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={pokemon.name} id={index + 1} pokemon={pokemon.name} />
      ))}
    </main>
  );
}
