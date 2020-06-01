# Créditos
Trabalho realizado para a Instituição SENAI - Jandira. Projeto realizado para aprendizagem sobre consumo de APIs. Orientador: [Fernando Leonid](https://github.com/fernandoleonid)

# Informações sobre a PokeAPI e o projeto
A [PokeAPI](https://pokeapi.co/) é uma API de pokemons, muito utilizada na internet para o desenvolvimento das famosas "POKEDEX", onde o usuário busca informações diversas sobre todos e qualquer pokemon na qual busca descobrir.

## Documentação da PokeAPI
A PokeAPI possui em sua documentação uma página que apresenta com tópicos separando os tipos de resultados que deseja encontrar, e as urls onde irá utilizar para encontrar. Além de informações sobre as diversas maneiras que se pode utilizar para realizar as buscas nas urls.

## Desenvolvimento da minha Pokedex
Utilizei como base da documentação da PokeAPI a sessão "Pokemons/Pokemons" que nos instrui maneiras de achar todo o tipo de informações sobre qualquer pokemon que for solicitado pela url

A Url permite realizar as buscas dos pokemons por dois tipos:
- Através do ID do pokemon na pokedex do anime (encontrado em qualquer pokedex e no anime também).
- Através do Nome do Pokemon

Para o nome do pokemon, fui obrigado a validar com "toLowerCase", pois, na API os pokemons são encontrados com as letras minusculas.

## Funções da minha Pokedex
Nesta você pode pesquisar todo o tipo de pokemon que quiser, basta digitar o nome ou a id do pokemon, e em seguida, aparecerá um "card flip" com as informações do pokemons. Estas informações podem ser:
- A vida do pokemon.
- A defesa do pokemon.
- O ataque do pokemon.
- A velocidade do pokemon.
- Sua versão Shine (com imagem ilustrativa).

Além do mais, ao carregar a página você terá em vista pokemons do 1 ao 100 na pokedex.

# Consumindo a API
Para consumir a API foi necessário a url "https://pokeapi.co/api/v2/pokemon/{id_or_name}/", onde podemos utilizar tanto o id quanto o nome do pokemon para pesquisar

## codificação
Primeiro, em uma função assíncrona, dentro de um laço que ia de 1 a 100, eu criei uma variável chamada "url", que recebeu a url da api utilizado o contador do laço para captar o id do pokemon, exemplo com pokemon id = 1:

~~~javascript
    const url = `https://pokeapi.co/api/v2/pokemon/1/`;
~~~

Em seguida, dei o "fetch" na url e gerei o json da seguinte maneira:

~~~javascript
    const getApi = await fetch(url);
    const json = await getApi.json();
~~~

Com estas linhas de código já foi possível obter as informações da API utilizadas na página, como por exemplo:

~~~javascript
    //O nome do Pokemon
    const name = await json.name;

    //A imagem do pokemon de frente
    const img = await json.sprites.front_default;

    //A informação sobre a vida do Pokemon
    const pokemonHealth = await json.stats[5].base_stat;

    //A informação sobre o Ataque do Pokemon
    const pokemonAttach = await json.stats[4].base_stat;

    //A informação sobre a defesa do pokemon
    const pokemonDefense = await json.stats[3].base_stat;

    //E a velocidade do Pokemon
    const pokemonSpeed = await json.stats[0].base_stat;
~~~

Também foi possível coletar informação sobre a versão shine do pokemon, onde  criamos uma função chamada "carregaPokemonShiny" que retornou da API a imagem do pokemon shine de frente.

~~~javascript
    //Função que obtem a imagem do pokemon shine
    const carregaPokemonShiny = async (id) =>{
        const url = `https://pokeapi.co/api/v2/pokemon-form/${id}/`;
        const getApi = await fetch(url);
        const json = await getApi.json();

        const shiny = json.sprites.front_shiny.toString();

        return shiny;
    }

    //variável que está guardando a informação
    const shiny = await carregaPokemonShiny(searchName);
~~~

## Possiveis problemas
Como possivel problema, podemos encontrar, se o usuário realizar uma busca por pokemon antes que a mensagem de que a página está sendo carregada suma da tela, pois, esta mensagem realmente informa que a tela ainda está carregando, e a pesquisa antecipada poderá gerar confusão de dados, travamento da página e até erro no console do navegador.

Para evitar estes problemas, espere até que a página esteja completamente carregada. Você saberá disso quando a mensagem de carregamento sumir da tela.

## Bugs Corrigidos
- Aprensentando bugs ao tentar visualizar o último card da página.
Este problema causava uma instabilidade na página impossibilitando que o usuário veja os últimos cards. O problema foi corrigido, pois havia um erro no overflow da página.

![Pokemon Pikachu](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png) [PokeAPI](https://pokeapi.co/) ![Pokemon Pikachu](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png)