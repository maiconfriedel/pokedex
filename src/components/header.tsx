import Image from "next/image";

interface HeaderProps {
  onChangeSearchInput(value: string): void;
}

export default function Header({ onChangeSearchInput }: HeaderProps) {
  return (
    <header className="bg-[#dc0a2d] text-white font-bold px-3 py-5 flex flex-col justify-center text-xl rounded">
      <div className="flex flex-row items-center">
        <Image
          src="/pokeball.png"
          height={0}
          width={25}
          alt="pokeball"
          className="mr-3"
        />
        Pokedex
      </div>
      <div className="mt-3 flex">
        <input
          type="text"
          placeholder="Search"
          className="font-bold rounded-2xl py-1 px-3 text-zinc-500 text-[14px] w-full mb-3"
          onChange={(e) => {
            onChangeSearchInput(e.target.value);
          }}
        />
      </div>
    </header>
  );
}
