const promesaRickYMorty = fetch("https://rickandmortyapi.com/api/character/1")
const vueltaPromesa = promesaRickYMorty.then((response)=>{
    const data = response.json();
    data.then((character)=>{
        console.log(character)
    })
}).catch((error)=>{
    console.log("Error en la petición", error)
}).finally(()=>{
    console.log("felicidades has conseguido un personaje o no")
})
console.log("que tal estas")