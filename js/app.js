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
    searchPokemon(e.target);
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
    console.log(data);
    return data;

}

const searchPokemon = async(target) => {
    let allPokemon = await getAllPokemon();
    pokeCard.innerHTML = '';
    Object.values(allPokemon.results).forEach((pokemon) => {
        if (pokemon.name === target.value) {
            drawPokemonCard(pokemon);
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
        exp_base: datosPokemon.base_experience,
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

    clone.querySelector('.card-body-text').innerHTML = `Exp Base: <span>${newPokemon.exp_base}</span>`;
    clone.querySelector('.card-body-text').innerHTML += '<br><br>';
    clone.querySelector('.card-body-text').innerHTML += 'Tipo: ';
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
                arrayColores.push('style="background:gray; color:#ffffff""');
                break;
            case 'fighting':
                arrayColores.push('style="background:#940000; color:#ffffff"');
                break;
            case 'flying':
                arrayColores.push('style="background:#58aaca; color:#ffffff"');
                break;
            case 'poison':
                arrayColores.push('style="background:#830094; color:#ffffff"');
                break;
            case 'ground':
                arrayColores.push('style="background:#94672d; color:#ffffff"');
                break;
            case 'rock':
                arrayColores.push('style="background:#704000; color:#ffffff"');
                break;
            case 'bug':
                arrayColores.push('style="background:#8abe0f; color:#ffffff"');
                break;
            case 'ghost':
                arrayColores.push('style="background:#370047; color:#ffffff"');
                break;
            case 'steel':
                arrayColores.push('style="background:#646f7c; color:#ffffff"');
                break;
            case 'fire':
                arrayColores.push('style="background:#f83b01; color:#ffffff"');
                break;
            case 'water':
                arrayColores.push('style="background:#0045e7; color:#ffffff"');
                break;
            case 'grass':
                arrayColores.push('style="background:#06bd00; color:#ffffff"');
                break;
            case 'electric':
                arrayColores.push('style="background:#f1ed00; color:#000000"');
                break;
            case 'psychic':
                arrayColores.push('style="background:#7f4581; color:#ffffff"');
                break;
            case 'ice':
                arrayColores.push('style="background:#00f3fb; color:#ffffff"');
                break;
            case 'dragon':
                arrayColores.push('style="background: linear-gradient(0deg, rgba(34,181,195,0.6783088235294117) 0%, rgba(226,45,253,0.6502976190476191) 100%)"');
                break;
            case 'dark':
                arrayColores.push('style="background:#242424; color:#ffffff"');
                break;
            case 'fairy':
                arrayColores.push('style="background:#c538ae; color:#ffffff"');
                break;
            case 'unknown':
                arrayColores.push('style="background:#555555; color:#ffffff"');
                break;
            case 'shadow':
                arrayColores.push('style="background:#430249; color:#ffffff"');
                break;

            default:

        }
    })
    return arrayColores;
}