import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "~/components/Home/Card/Card";
import Pagination from "~/components/Home/Pagination/Pagination";
import Logo from "~/components/common/Logo/Logo";
import DefaultLayout from "~/components/common/layouts/DefaultLayout/DefaultLayout";

export default function Home() {
  const navigate = useNavigate();
  const [listPokemon, setListPokemon] = useState({});
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [pagination, setPagination] = useState({
    limit: 50,
    offset: 0,
  });

  const handlePrevPage = () => {
    const { limit, offset } = pagination;

    setCurrentPage((prev) => prev - 1);
    setPagination((prev) => ({
      ...prev,
      offset: offset - limit,
    }));
  };

  const handlePageNumber = (page_number) => {
    const { limit } = pagination;

    setCurrentPage(page_number);
    setPagination((prev) => ({
      ...prev,
      offset: page_number === 1 ? 0 : page_number * limit,
    }));
  };

  const handleNextPage = () => {
    const { limit, offset } = pagination;

    setCurrentPage((prev) => prev + 1);
    setPagination((prev) => ({
      ...prev,
      offset: offset + limit,
    }));
  };

  const handleSliderPageNumbers = (totalData) => {
    const pageNumbers = [];
    const pageRange = 5;
    const totalPages = Math.ceil(totalData / pagination.limit) - 1;

    let start = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let end = Math.min(totalPages, start + pageRange - 1);

    if (end - start < pageRange - 1) {
      start = Math.max(1, end - pageRange + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    setTotalPages(totalPages);
    return pageNumbers;
  };

  const handleRedirectCard = (name) => {
    navigate(`/details/${name}`);
  };

  const fetchPokemonData = async () => {
    try {
      const { limit, offset } = pagination;

      const responsePokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await responsePokemon.json();

      const pokemonDetailsPromises = data.results.map(async (pokemon) => {
        const detailsResponse = await fetch(pokemon.url);
        const dataDetails = await detailsResponse.json();

        const speciesResponse = await fetch(dataDetails.species.url);
        const dataSpecies = await speciesResponse.json();

        dataDetails.species = {
          ...dataDetails.species,
          color: dataSpecies.color,
        };

        return dataDetails;
      });

      const pokemonDetails = await Promise.all(pokemonDetailsPromises);

      data.resultDetails = pokemonDetails;
      setListPokemon(data);

      setPageNumbers(handleSliderPageNumbers(data.count));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  useEffect(() => {
    fetchPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultLayout>
      <Logo />
      <Card data={listPokemon} handleRedirect={handleRedirectCard} />
      <Pagination
        pagination={pagination}
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handlePageNumber={handlePageNumber}
        handleNextPage={handleNextPage}
      />
    </DefaultLayout>
  );
}
