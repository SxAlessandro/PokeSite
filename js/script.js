const url = "https://pokeapi.co/api/v2/generation/generation-i"
container = document.getElementById("pokemonsheet")
detailsbox = document.getElementById("detailbox")
searchbox = document.getElementById("searchbox")
search = document.getElementById("search")
reset = document.getElementById("reset") 

function createallcards(){
    container.innerHTML = ``
    detailsbox.innerHTML = ``
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const pokemonarray = data.pokemon_species;

        pokemonarray.forEach(data => {
            let urlpokemon = `https://pokeapi.co/api/v2/pokemon/${data.name}`
            fetch(urlpokemon)
                .then(response => response.json())
                .then(datapokemon => {
                    asyncCall();
                    const pokemon = createPokemon(datapokemon);
                    container.appendChild(pokemon);
            })
        });
    });
};

const createPokemon = (datapokemon) => {
    const pokemoncard = document.createElement("div");
    pokemoncard.classList.add("poke-box");
    pokemoncard.setAttribute("name", datapokemon.name);
    pokemonsprites = datapokemon.sprites.front_default
    pokemoncard.innerHTML = `
        ${datapokemon.name}
        <img src=${pokemonsprites} alt="Photo ${datapokemon.name}"> 
    `;

    pokemoncard.addEventListener("click", () => {
        fetchCardDetails(datapokemon.name);  
        detailsbox.style.display = "block";
    });

    return pokemoncard;
};

function fetchCardDetails(name){
    let detailpokemon = `https://pokeapi.co/api/v2/pokemon/${name}`

    fetch(detailpokemon)
    .then(response => response.json())
    .then(details => {
        pokemonsprite = details.sprites.versions['generation-v']['black-white'].animated.front_default
        detailsbox.innerHTML = `
            <div id="titledetail">${details.name}</div>
            <img src=${pokemonsprite} alt="Photo ${details.name}">
            <div class="container">
                <div class="statinfo">
                    <div>HP <div class="statfield">${details.stats[0].base_stat}</div></div>
                    <div>ATK <div class="statfield">${details.stats[1].base_stat}</div></div>
                    <div>DEF <div class="statfield">${details.stats[2].base_stat}</div></div>
                    <div class="col-12"></div>
                    <div>SATK <div class="statfield">${details.stats[3].base_stat}</div></div>
                    <div>SDEF <div class="statfield">${details.stats[4].base_stat}</div></div>
                    <div>SPD<div class="statfield">${details.stats[4].base_stat}</div></div>
                </div>
                <div id="type"><div id="type1" class="types">${details.types[0].type.name}</div></div>
                <i class="fa-solid fa-volume-high" id="cry"></i>
                <div id="titleabilities">Abilities</div>
                <div class="statinfo">
                    <div class="abilities">${details.abilities[0].ability.name}</div>
                    <div class="abilities">${details.abilities[1].ability.name}</div>
                </div>
            </div>
        `;

        document.getElementById("cry").addEventListener("click", () => {
            let cry = new Audio(details.cries.latest);
            cry.play()
        });

        document.getElementById("type1").classList.add(details.types[0].type.name)

        if(details.types[1].type.name != undefined){
            document.getElementById("type").innerHTML = `
            <div id="type1" class="types">${details.types[0].type.name}</div>
            <div id="type2" class="types">${details.types[1].type.name}</div>
            `
            document.getElementById("type1").classList.add(details.types[0].type.name)
            document.getElementById("type2").classList.add(details.types[1].type.name)
        }
    });
};

search.addEventListener("click", () => {
        let urlpokemon = `https://pokeapi.co/api/v2/pokemon/${searchbox.value.toLowerCase()}`
    fetch(urlpokemon)
                .then(response => response.json())
                .then(datapokemon => {
                    if(searchbox.value != ""){
                        container.innerHTML = `<i class="fa-solid fa-arrow-left" id="back"></i>`
                        detailsbox.innerHTML = ``
                        const pokemon = createPokemon(datapokemon);
                        container.appendChild(pokemon);

                        document.getElementById("back").addEventListener("click", () => {
                            createallcards();
                        });
                    }
                    else{}
            })
});

createallcards();

async function asyncCall() {
    const result = await fetch(url);
}