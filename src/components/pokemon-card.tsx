"use client";

import Image from "next/image";
import { Pokemon, PokemonClient } from "pokenode-ts";
import { useEffect, useState } from "react";

interface Props {
  pokemon: string;
  id: number;
}

export default function PokemonCard({ pokemon, id }: Props) {
  const [pokemonData, setPokemonData] = useState<Pokemon>();

  useEffect(() => {
    async function loadData() {
      const pokeClient = new PokemonClient();
      const response = await pokeClient.getPokemonByName(pokemon);
      setPokemonData(response);
    }

    loadData();
  }, [pokemon]);

  return (
    <div className="bg-gray-300 p-2 flex flex-col items-center justify-center">
      {pokemon}
      <Image
        width={10}
        height={10}
        alt={pokemon}
        src={
          pokemonData?.sprites.other?.["official-artwork"]
            .front_default as string
        }
      />
    </div>
  );
}
