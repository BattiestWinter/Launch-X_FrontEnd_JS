//Ids de divisiones asociados a valores
const pokeNameS = document.getElementById('pName');
const pokeIdS = document.getElementById('pId');
const pokeWeightS = document.getElementById('pWeight');
const pokeHeightS = document.getElementById('pHeight');
const pokeTypesS = document.getElementById('pTypes');
const pokeFondoS = document.getElementById('pFondo');
const pokeStatsS = document.getElementById('pStats');

//Colores para el tipo de pokémon
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const fetchPokemon = () => {

    //Obtener entrada (Nombre del pokémon)
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    
    //Respuesta
    fetch(url).then((res) => {
        
        //Respuesta
        //console.log(res);

        //Validar resultado
        if(res.status != 200){
            pokeImg("./Imagenes/Silueta.png");
            pokeFondoS.style.backgroundColor = '#FFFFFF';
        }else{
            return res.json();
        }
    
        
    }).then((data) => {
        
        //Datos
        console.log(data);

        //Nombre
        pokeNameS.textContent = data.name;

        //Id
        pokeIdS.textContent = `#${data.id}`;

        //Imagen
        let pokeImage = data.sprites.other.home.front_default;
        pokeImg(pokeImage);

        //Información
        pokeWeightS.textContent = `Weight: ${data.weight}`;
        pokeHeightS.textContent = `Height: ${data.height}`;

        //Tipos
        const { stats, types } = data;
        pokeTypes(types);

        //Estadísticas
        pokeStats(stats);

        //Movimientos

        //Color de Fondo
        pokeColor(types);
    })
}

//Asignar imagen a partir de url
const pokeImg = (url) => {
    const pokeImage = document.getElementById("pokeImage");
    pokeImage.src = url;
}

//Lista de tipos
const pokeTypes = (types) => {
    pokeTypesS.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        pokeTypesS.appendChild(typeTextElement);
    });
}

//Color de fondo
const pokeColor = (types) => {
    pokeFondoS.style.backgroundColor = typeColors[types[0].type.name]
}

//Lista de estadísticas
const pokeStats = (stats) => {
    pokeStatsS.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStatsS.appendChild(statElement);
    });
}
