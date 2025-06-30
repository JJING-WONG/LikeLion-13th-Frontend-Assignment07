import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
    width: 150px;
    border: 2px solid #ddd;
    border-radius: 12px;
    padding: 10px;
    margin: 10px;
    text-align: center;
    background-color: #f8f8f8;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }

    img {
        width: 100px;
        height: 100px;
    }

    a {
        color: #333;
        text-decoration: none;
        text-transform: capitalize;
    }
`;

function getIdFromUrl(url) { // 포켓몬의 고유 ID 추출하는 함수입니당. 이미지를 가져오기 위해 필요합니다
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
}

function PokemonCard({ pokemon }) { // 본격적으로 이미지를 가져올 함수입니다
    const id = getIdFromUrl(pokemon.url);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                        // 이 주소는 api를 만든 사람의 깃허브에서 가져온 것입니당

    return (
        <Card>
        <Link to={`/pokemon/${pokemon.name}`}>
            <img src={imageUrl} alt={pokemon.name} />
            <div>{pokemon.name}</div>
        </Link>
        </Card>
    );
}

export default PokemonCard;