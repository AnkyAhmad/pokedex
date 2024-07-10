import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "~/components/common/layouts/DefaultLayout/DefaultLayout";
import Logo from "~/components/common/Logo/Logo";
import Attribute from "~/components/PokemonDetail/Attribute/Attribute";
import TableMove from "~/components/PokemonDetail/TableMove/TableMove";

export default function Details() {
  const { name } = useParams();
  const [detailPokemon, setDetailPokemon] = useState({});

  const filterAndSortPokemonMoves = (moves, generation, method) => {
    const filteredMoves = moves.filter((move) =>
      move.learn_method.some(
        (x) => x.generation.includes(generation) && x.method.includes(method)
      )
    );

    const sortedMoves = filteredMoves.sort((a, b) => {
      const levelA = a.learn_method.find(
        (x) => x.generation.includes(generation) && x.method.includes(method)
      ).level_learned_at;

      const levelB = b.learn_method.find(
        (x) => x.generation.includes(generation) && x.method.includes(method)
      ).level_learned_at;

      return levelA - levelB;
    });

    return sortedMoves;
  };

  const fetchPokemonDetails = async () => {
    const urls = [
      `https://pokeapi.co/api/v2/pokemon/${name}`,
      `https://pokeapi.co/api/v2/move-learn-method/`,
    ];

    const pokemonPromises = urls.map(async (url) => {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    });

    const [data, moveLearnMethod] = await Promise.all(pokemonPromises);

    const speciesResponse = await fetch(data.species.url);
    const dataSpecies = await speciesResponse.json();

    const pokemonMovesPromises = data.moves.map(async (data) => {
      const moveResponse = await fetch(data.move.url);
      const moveDetails = await moveResponse.json();

      const learnMethod = data.version_group_details.map((detail) => {
        return {
          level_learned_at: detail.level_learned_at,
          method: detail.move_learn_method.name,
          generation: detail.version_group.name,
        };
      });

      return {
        name: moveDetails.name,
        type: moveDetails.type.name,
        category: moveDetails.damage_class.name,
        power: moveDetails.power,
        accuracy: moveDetails.accuracy,
        learn_method: learnMethod,
      };
    });

    const pokemonMoves = await Promise.all(pokemonMovesPromises);

    const pokemonMovesFilteredLvlUp = filterAndSortPokemonMoves(
      pokemonMoves,
      "red-blue",
      moveLearnMethod.results[0].name
    );

    const pokemonMovesFilteredMachines = filterAndSortPokemonMoves(
      pokemonMoves,
      "red-blue",
      moveLearnMethod.results[3].name
    );

    data.moves = pokemonMoves;
    data.moves_filtered = {
      level_up: pokemonMovesFilteredLvlUp,
      machines: pokemonMovesFilteredMachines,
    };
    data.species = {
      ...data.species,
      color: dataSpecies.color,
    };
    data.option_learn_method = moveLearnMethod.results;

    setDetailPokemon(data);
  };

  useEffect(() => {
    fetchPokemonDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultLayout>
      <Logo />
      <div className="content_layout">
        <Attribute detailPokemon={detailPokemon} />
        <div className="content_table">
          <TableMove
            title={"ALL MOVES"}
            detailPokemon={detailPokemon}
            dataTable={detailPokemon.moves}
            number={false}
          />
          <TableMove
            title={"MOVES LEARNED BY LEVEL UP IN GENERATION RED BLUE#1"}
            methode={"Level Up"}
            detailPokemon={detailPokemon}
            dataTable={detailPokemon.moves_filtered?.level_up}
          />
          <TableMove
            title={"MOVES LEARNED BY TM/HM IN GENERATION RED BLUE#1"}
            methode={"TM/HM"}
            machines={true}
            detailPokemon={detailPokemon}
            dataTable={detailPokemon.moves_filtered?.machines}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
