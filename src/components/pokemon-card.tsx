"use client";

import { capitalizeString } from "@/lib/capitalizeString";
import Image from "next/image";

interface Props {
  pokemon: string;
  id: number;
}

export default function PokemonCard({ pokemon, id }: Props) {
  if (!pokemon) {
    return null;
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center rounded-lg shadow-xl border-2 border-stone-200 cursor-pointer hover:bg-gray-300">
      <div className="flex flex-1 w-full justify-end text-[12px] text-zinc-400 mr-2 mt-1">
        # {id.toString().padStart(3, "0")}
      </div>
      {!pokemon ? (
        <Image
          width={100}
          height={100}
          alt={pokemon}
          src="/loading.png"
          className="animate-pulse opacity-50"
        />
      ) : (
        <Image
          width={100}
          height={100}
          alt={pokemon}
          className="z-10"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        />
      )}
      <div className="font-semibold text-zinc-600 bg-zinc-200 w-full h-[50px] mt-[-33px] flex items-end justify-center rounded-t-lg">
        {capitalizeString(pokemon)}
      </div>
    </div>
  );
}
