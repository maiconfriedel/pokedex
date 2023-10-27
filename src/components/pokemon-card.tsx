import Image from "next/image";

interface Props {
  pokemon: string;
  id: number;
}

export default function PokemonCard({ pokemon, id }: Props) {
  return (
    <div className="bg-gray-300 p-2 flex flex-col items-center justify-center">
      {pokemon}
      <Image
        width={10}
        height={10}
        alt={pokemon}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
      />
    </div>
  );
}
