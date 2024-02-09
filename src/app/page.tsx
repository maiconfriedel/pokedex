"use client";

import Header from "@/components/header";
import PokemonCard from "@/components/pokemon-card";
import { NamedAPIResource, PokemonClient } from "pokenode-ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Home() {
  const [pokemons, setPokemons] = useState<NamedAPIResource[]>([]);
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const page = useRef(1);

  const loadInitialData = useCallback(async () => {
    const pokeClient = new PokemonClient();
    const response = await pokeClient.listPokemons(0, 50);

    setPokemons(response.results);
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const loadScrollData = useCallback(async (page: number) => {
    const pokeClient = new PokemonClient();
    const response = await pokeClient.listPokemons((page - 1) * 50, 50);

    setPokemons((current) => [...current, ...response.results]);
  }, []);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    if (search === "") {
      console.log("searchValue", search);
      page.current++;
      loadScrollData(page.current);
    }
  }, [loadScrollData, page, search]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [handleScroll]);

  function handleSearchText(value: string) {
    setSearch(value);
  }

  useEffect(() => {
    async function searchData() {
      if (searchValue !== "") {
        const pokeClient = new PokemonClient();
        const response = await pokeClient.listPokemons(0, 10000);

        setPokemons(
          response.results.filter((a) => a.name.includes(searchValue))
        );
      } else {
        page.current = 1;
        loadInitialData();
      }
    }
    searchData();
  }, [searchValue, loadInitialData]);

  return (
    <>
      <Header onChangeSearchInput={handleSearchText} />
      <main className="p-2 py-5 px-3 grid grid-cols-3 gap-3 lg:grid-cols-6">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            id={Number.parseInt(pokemon.url.split("/").reverse().slice(1)[0])}
            pokemon={pokemon.name}
          />
        ))}
      </main>
    </>
  );
}
