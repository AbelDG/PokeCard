//-----------------------------------------------------------| DEFINICIONES |-----------------------------------------------------------
const buscador = document.getElementById('buscador');
const pokeCard = document.querySelector('.flex-poke-card');
const template = document.querySelector('#template-card').content;


const fragment = document.createDocumentFragment();



let newPokemon = {};
//-----------------------------------------------------------| MAIN |-----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {


});

//-----------------------------------------------------------| MAIN - EVENTOS |-----------------------------------------------------------

buscador.addEventListener('keyup', (e) => {
    e.preventDefault();
    searchPokemon();
});


//-----------------------------------------------------------| FUNCIONES |-----------------------------------------------------------



const getAllPokemon = async() => {
    let data = {};
    try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000`);
        data = await resp.json();
    } catch (error) {
        console.log(error);
    }
    return data;
}

const getPokemonByName = async(pokemon) => {
    let data = {};
    try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        data = await resp.json();
    } catch (error) {
        console.log(error);
    }
    return data;
}

const searchPokemon = async() => {
    let allPokemon = await getAllPokemon();
    Object.values(allPokemon.results).forEach((pokemon) => {
        if (pokemon.name === buscador.value) {
            pokeCard.innerHTML = '';
            drawPokemonCard(pokemon);
        } else {
            pokeCard.innerHTML = '';
        }
    })
}

const drawPokemonCard = async(pokemon) => {
    let datosPokemon = await getPokemonByName(pokemon);
    newPokemon = {
        id: datosPokemon.id,
        img: datosPokemon.sprites.other.dream_world.front_default,
        nombre: datosPokemon.name.charAt(0).toUpperCase() + datosPokemon.name.slice(1),
        tipo: {
            elemento: convertTypesEN_to_ESP(getTypes(datosPokemon.types)),
            color: getColorType(getTypes(datosPokemon.types))
        },
        stats: {
            hp: datosPokemon.stats[0].base_stat,
            ataque: datosPokemon.stats[1].base_stat,
            defensa: datosPokemon.stats[2].base_stat,
            ataqueEspecial: datosPokemon.stats[3].base_stat,
            defensaEspecial: datosPokemon.stats[4].base_stat,
            velocidad: datosPokemon.stats[5].base_stat,
        }
    }



    const clone = template.cloneNode(true);

    clone.querySelector('.card-body-img').setAttribute('src', newPokemon.img);
    clone.querySelector('.card-body-title').innerHTML = `${newPokemon.nombre}  <span>#${newPokemon.id}</span>`;

    clone.querySelector('.card-body-text').innerHTML = 'Tipo: ';
    // console.log(Object.values(newPokemon.tipo));
    for (let i = 0; i < newPokemon.tipo.elemento.length; i++) {
        clone.querySelector('.card-body-text').innerHTML += `<span ${newPokemon.tipo.color[i]}>${newPokemon.tipo.elemento[i]}</span>`;
        clone.querySelector('.card-body-text').innerHTML += ' ';
    }


    clone.querySelectorAll('.card-footer-stats h3')[0].textContent = newPokemon.stats.hp;
    clone.querySelectorAll('.card-footer-stats h3')[1].textContent = newPokemon.stats.ataque;
    clone.querySelectorAll('.card-footer-stats h3')[2].textContent = newPokemon.stats.defensa;
    clone.querySelectorAll('.card-footer-stats h3')[3].textContent = newPokemon.stats.ataqueEspecial;
    clone.querySelectorAll('.card-footer-stats h3')[4].textContent = newPokemon.stats.defensaEspecial;
    clone.querySelectorAll('.card-footer-stats h3')[5].textContent = newPokemon.stats.velocidad;


    fragment.appendChild(clone);
    pokeCard.appendChild(fragment);
}




const getTypes = (datos) => {
    let arrayTipos = [];
    Object.values(datos).forEach(dato => {
        arrayTipos.push(dato.type.name);
    });
    return arrayTipos;
}

const convertTypesEN_to_ESP = (types) => {
    let tiposESP = [];
    types.forEach((type) => {
        switch (type) {
            case 'normal':
                tiposESP.push('Normal');
                break;
            case 'fighting':
                tiposESP.push('Luchador');
                break;
            case 'flying':
                tiposESP.push('Volador');
                break;
            case 'poison':
                tiposESP.push('Veneno');
                break;
            case 'ground':
                tiposESP.push('Tierra');
                break;
            case 'rock':
                tiposESP.push('Roca');
                break;
            case 'bug':
                tiposESP.push('Bicho');
                break;
            case 'ghost':
                tiposESP.push('Fantasma');
                break;
            case 'steel':
                tiposESP.push('Metal');
                break;
            case 'fire':
                tiposESP.push('Fuego');
                break;
            case 'water':
                tiposESP.push('Agua');
                break;
            case 'grass':
                tiposESP.push('Planta');
                break;
            case 'electric':
                tiposESP.push('Eléctrico');
                break;
            case 'psychic':
                tiposESP.push('Psíquico');
                break;
            case 'ice':
                tiposESP.push('Hielo');
                break;
            case 'dragon':
                tiposESP.push('Dragón');
                break;
            case 'dark':
                tiposESP.push('Siniestro');
                break;
            case 'fairy':
                tiposESP.push('Hada');
                break;
            case 'unknown':
                tiposESP.push('Desconocido');
                break;
            case 'shadow':
                tiposESP.push('Sombra');
                break;

            default:

        }
    });
    return tiposESP;
}


const getColorType = (types) => {
    let arrayColores = [];
    Object.values(types).forEach(type => {
        switch (type) {
            case 'normal':
                arrayColores.push('style="background:gray"');
                break;
            case 'fighting':
                arrayColores.push('style="background:#940000"');
                break;
            case 'flying':
                arrayColores.push('style="background:#58aaca"');
                break;
            case 'poison':
                arrayColores.push('style="background:#830094"');
                break;
            case 'ground':
                arrayColores.push('style="background:#94672d"');
                break;
            case 'rock':
                arrayColores.push('style="background:#704000"');
                break;
            case 'bug':
                arrayColores.push('style="background:#8abe0f"');
                break;
            case 'ghost':
                arrayColores.push('style="background:#8abe0f"');
                break;
            case 'steel':
                arrayColores.push('style="background:#646f7c"');
                break;
            case 'fire':
                arrayColores.push('style="background:#f83b01"');
                break;
            case 'water':
                arrayColores.push('style="background:#0045e7"');
                break;
            case 'grass':
                arrayColores.push('style="background:#06bd00"');
                break;
            case 'electric':
                arrayColores.push('style="background:#f1ed00; color:#000000"');
                break;
            case 'psychic':
                arrayColores.push('style="background:#7f4581"');
                break;
            case 'ice':
                arrayColores.push('style="background:#00f3fb"');
                break;
            case 'dragon':
                arrayColores.push('style="background: linear-gradient(0deg, rgba(34,181,195,0.6783088235294117) 0%, rgba(226,45,253,0.6502976190476191) 100%)"');
                break;
            case 'dark':
                arrayColores.push('style="background:#242424"');
                break;
            case 'fairy':
                arrayColores.push('style="background:#c538ae"');
                break;
            case 'unknown':
                arrayColores.push('style="background:#555555"');
                break;
            case 'shadow':
                arrayColores.push('style="background:#430249"');
                break;

            default:

        }
    })
    return arrayColores;
}