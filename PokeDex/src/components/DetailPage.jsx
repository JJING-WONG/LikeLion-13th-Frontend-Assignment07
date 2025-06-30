import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

const Container = styled.div`
    padding: 40px;
    background-color: #f5f5f5;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Card = styled.div`
    background-color: #fff;
    border: 4px solid #e60012;
    border-radius: 24px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    padding: 40px;
    max-width: 400px;
    width: 100%;
    text-align: center;
`;

const ImageWrapper = styled.div`
    background-color: #f5f5f5;
    border-radius: 50%;
    width: 180px;
    height: 180px;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid #222;
`;

const PokemonImage = styled.img`
    width: 100px;
    height: 100px;
`;

const Name = styled.h1`
    font-size: 2rem;
    margin-bottom: 10px;
    color: #222;
    text-transform: uppercase;
`;

const TypeBadge = styled.span`
    background-color: #222;
    color: #fff;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    margin: 4px;
`;

const StatList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 20px;
    border-top: 2px solid #e60012;
`;

const StatItem = styled.li`
    font-size: 1rem;
    font-weight: bold;
    color: #222;
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e60012;
`;

function DetailPage() {
    const { name } = useParams();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const { data: pokemon, isLoading, isError } = useQuery({
      queryKey: ["pokemonDetail", name],
      queryFn: async () => {
        const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
        return response.data;
      }
    });

    if (isLoading) {
      return (
        <Container>
          <ClipLoader size={60} color={"#e60012"} />
        </Container>
      );
    }

    if (isError) { // 혹시 모를 에러에 대비해 넣어봤습니다
      return (
        <Container>
          포켓몬 정보를 불러오는 데 실패했습니다.
        </Container>
      );
    }

    return (
      <Container>
        <Card>
          <ImageWrapper>
            <PokemonImage
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </ImageWrapper>

          <Name>{pokemon.name}</Name>

          <div>
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name}>{t.type.name}</TypeBadge>
            ))}
          </div>

          <StatList>
            {pokemon.stats.map((stat) => (
              <StatItem key={stat.stat.name}>
                <span>{stat.stat.name.toUpperCase()}</span> 
                <span>{stat.base_stat}</span>
              </StatItem>
            ))}
          </StatList>
        </Card>
      </Container>
    );
}

export default DetailPage;