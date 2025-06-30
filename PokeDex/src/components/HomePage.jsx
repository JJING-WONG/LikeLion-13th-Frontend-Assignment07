import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import PokemonCard from "./PokemonCard";

const Container = styled.div`
    padding: 20px;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 20px;
`;

const SearchInput = styled.input`
    padding: 10px;
    font-size: 1rem;
    width: 250px;
    border: 2px solid #ccc;
    border-radius: 8px;
    margin-bottom: 30px;
`;

const PokemonList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
    padding: 0;
`;

function HomePage() {
    const [search, setSearch] = useState('');
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const { data: pokemonList = [], isLoading, isFetching } = useQuery({
        queryKey: ["pokemonList"],
        queryFn: async () => {
        const response = await axios.get(`${BASE_URL}/pokemon?limit=151`);
        return response.data.results;
        },
    });

    const filtered = pokemonList.filter(pokemon =>  // 대소문자 구분 없이 검색 위해 소문자로 바꾸기
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container>
        <Title>포켓몬 도감</Title>
        <SearchInput
            type="text"
            placeholder="포켓몬 이름 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        {isLoading || isFetching ? ( // 여기엔 스피너가 필요없어 보이긴 한데 그래도 혹시 몰라 하나 더 추가했습니다. 디테일페이지가 스피너의 메인입니당.
            <div style={{ marginTop: "50px" }}>
            <ClipLoader size={60} color="#3b4cca" />
            </div>
        ) : (
            <PokemonList>
            {filtered.map(pokemon => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
            </PokemonList>
        )}
        </Container>
    );
}

export default HomePage;