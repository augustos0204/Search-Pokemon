"use-strict";

const exibeDados = (name, img, health, attack, defense, speed, shiny) => {
    const pagina = document.getElementById('containerPagina');
    const card = document.createElement('div');
    const buttonFlip = document.createElement('div');
    card.className = 'pokemonCard';
    card.innerHTML = 
    `
        <div class="cardFront">
            <div class="pokemonIconeContainer">
                <figure class="pokemonIcone">
                    <img src="${img}" alt="pokemon" title="pokemon">
                </figure>
            </div>
            <div class="pokemonNome">
                ${name}
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
                        ${health}
                    </div>
                </div>
                <div class="pokemonAttack pokemonStats">
                    <div class="statsTitle">
                        Attack:
                    </div>
                    <div class="statsValues">
                        ${attack}
                    </div>
                </div>
                <div class="pokemonDefense pokemonStats">
                    <div class="statsTitle">
                        Defense:
                    </div>
                    <div class="statsValues">
                        ${defense}
                    </div>
                </div>
                <div class="pokemonSpeed pokemonStats">
                    <div class="statsTitle">
                        Speed:
                    </div>
                    <div class="statsValues">
                        ${speed}
                    </div>
                </div>
            </div>
            <div class="containerShinyVersion">
                <figure class="containerShinyIcon">
                    <img src="${shiny}" alt="shiny_pokemon" title="shiny_pokemon">
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

const pesquisaPokemon = async () => {
    try{
        let searchName = document.getElementById('pokemonSearch').value;
        searchName = searchName.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${searchName}/`;
        const getApi = await fetch(url);
        const json = await getApi.json();

        const name = await json.name;
        const img = await json.sprites.front_default;
        const pokemonHealth = await json.stats[5].base_stat;
        const pokemonAttach = await json.stats[4].base_stat;
        const pokemonDefense = await json.stats[3].base_stat;
        const pokemonSpeed = await json.stats[0].base_stat;
        const shiny = await carregaPokemonShiny(searchName);

        document.getElementById('containerPagina').innerHTML = "";
        exibeDados(name, img, pokemonHealth, pokemonAttach, pokemonDefense, pokemonSpeed, shiny);

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

        exibeDados(name, img, pokemonHealth, pokemonAttach, pokemonDefense, pokemonSpeed, shiny);

        if (i == 100){
            document.getElementById('wait').style.display = 'none';
        }
    }
}

carregaPokemons();
document.getElementById('buttonPesquisar').addEventListener('click', pesquisaPokemon);
document.getElementById('linkHomepage').addEventListener('click', e => {
    location.href = 'index.html';
});