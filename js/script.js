"use-strict";

const database = () => [
    {
        'Name:': 'N/A',
    }
];

const listarPokemons = async () =>{
    const url = 'https://pokeapi.co/api/v2/pokemon/44/';
    const getApi = await fetch(url);
    const json = await getApi.json();
    console.log(json);
}

listarPokemons();