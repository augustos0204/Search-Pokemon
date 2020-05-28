"use-strict";

const exibeDados = (pokemon) => {
    const pagina = document.getElementById('containerPagina');
    const card = document.createElement('div');
    const buttonFlip = document.createElement('div');
    card.className = 'pokemonCard';
    card.innerHTML = 
    `
        <div class="cardFront">
            <div class="pokemonIconeContainer">
                <figure class="pokemonIcone">
                    <img src="${pokemon.img}" alt="pokemon" title="pokemon">
                </figure>
            </div>
            <div class="pokemonNome">
                ${pokemon.name}
            </div>
            <div class="buttonFlip">
                <div class="buttonIcon">
                </div>
            </div>
        </div>
        <div class="cardBack">
            <div class="cardTitle">STATS</div>
            <div class="tableStats">
                <div class="pokemonLife pokemonStats">
                    <div class="statsTitle">
                        Health:
                    </div>
                    <div class="statsValues">
                        ${pokemon.vida}
                    </div>
                </div>
                <div class="pokemonAttack pokemonStats">
                    <div class="statsTitle">
                        Attack:
                    </div>
                    <div class="statsValues">
                        ${pokemon.ataque}
                    </div>
                </div>
                <div class="pokemonDefense pokemonStats">
                    <div class="statsTitle">
                        Defense:
                    </div>
                    <div class="statsValues">
                        ${pokemon.defesa}
                    </div>
                </div>
                <div class="pokemonSpeed pokemonStats">
                    <div class="statsTitle">
                        Speed:
                    </div>
                    <div class="statsValues">
                        ${pokemon.velocidade}
                    </div>
                </div>
            </div>
            <div class="containerShinyVersion">
                <figure class="containerShinyIcon">
                    <img src="${pokemon.shiny}" alt="shiny_pokemon" title="shiny_pokemon">
                </figure>
            </div>
        </div>
    `;
    pagina.appendChild(card);
    cardEffect();
}

const carregaPokemonShiny = async (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon-form/${id}/`;
    const getApi = await fetch(url);
    const json = await getApi.json();

    const shiny = json.sprites.front_shiny.toString();

    return shiny;
}

const pesquisaPokemon = async (pokemonName) => {
    try{
        pokemonName = pokemonName.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
        const getApi = await fetch(url);
        const json = await getApi.json();

        const name = await json.name;
        const img = await json.sprites.front_default;
        const pokemonHealth = await json.stats[5].base_stat;
        const pokemonAttach = await json.stats[4].base_stat;
        const pokemonDefense = await json.stats[3].base_stat;
        const pokemonSpeed = await json.stats[0].base_stat;
        const shiny = await carregaPokemonShiny(pokemonName);

        document.getElementById('containerPagina').innerHTML = "";

        const pokemon = {
            'name': name,
            'img': img,
            'vida': pokemonHealth,
            'defesa': pokemonDefense,
            'ataque': pokemonAttach,
            'velocidade': pokemonSpeed,
            'shiny': shiny
        }

        exibeDados(pokemon);

    }
    catch (exception_notFound_pokemon){
        if (exception_notFound_pokemon instanceof SyntaxError){
            alert('Não foi possível carregar este pokemon...');
        }
    }
}

const carregaPokemons = async () =>{
    for(let i = 1; i < 101; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        const getApi = await fetch(url);
        const json = await getApi.json();

        const name = await json.name;
        const img = await json.sprites.front_default;
        const pokemonHealth = await json.stats[5].base_stat;
        const pokemonAttach = await json.stats[4].base_stat;
        const pokemonDefense = await json.stats[3].base_stat;
        const pokemonSpeed = await json.stats[0].base_stat;
        const shiny = await carregaPokemonShiny(i);

        const pokemon = {
            'name': name,
            'img': img,
            'vida': pokemonHealth,
            'defesa': pokemonDefense,
            'ataque': pokemonAttach,
            'velocidade': pokemonSpeed,
            'shiny': shiny
        }

        exibeDados(pokemon);

        if (i == 100){
            document.getElementById('wait').style.display = 'none';
        }
    }
}

carregaPokemons();
document.getElementById('buttonPesquisar').addEventListener('click', pokemons => {
    pokemonName = document.getElementById('pokemonSearch').value;
    pesquisaPokemon(pokemonName);
});
document.getElementById('linkHomepage').addEventListener('click', e => {
    location.href = 'index.html';
});