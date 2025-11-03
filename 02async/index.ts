import axios from "axios";
type episode ={
        "id": number,
      "name": string,
      "air_date": string,
      "episode": string,
      "characters": string[],
      "url": string,
      "created": string,

}
type personaje ={
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: { 
        "name": string,
        "url": string, },
    location: {
      name: string,
      url: string,
    },
    image: string,
    episode: string[]|episode[],
    url: string,
    created: string,
}

const getCharacter = async (id:number)=>{
    const url:string="https://rickandmortyapi.com/api/character/"
    const personaje:personaje = (await axios.get(url+id)).data;
    return personaje
}
const getCharacterTheRightWay = async (id:number) =>{
    try {
        const res = await axios.get("https://rickandmortyapi.com/api/character/" + id);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("Axios error: "+ error.message)
        }else{
            console.log("Error: "+ error)
        }
    }
}
//const personaje = await getCharacterTheRightWay(1)

const getCharacters = async (ids: number[])=>{
    ids.forEach(async (x)=>{
        console.log((await getCharacter(x)).id)    
    })
}
//getCharacters([1,2,3])

const getMultipleCharacters = async (ids: number[])=>{
    const promesas = ids.map((elem)=>{
        return axios.get(`https://rickandmortyapi.com/api/character/${elem}`);
    })
    const responses = await Promise.all(promesas);
    console.log(responses)
}
//getMultipleCharacters([4,5,6])

const getMultipleCharactersNames = async (ids: number[])=>{
    const promesas = ids.map(async (elem)=>{
        //return axios.get(`https://rickandmortyapi.com/api/character/$[elem]`+'https://rickandmortyapi.com/api/character/$[elem]'+ ´https://rickandmortyapi.com/api/character/$[elem]´ );
        const arrayPrommesas1 = (await axios.get("https://rickandmortyapi.com/api/character/"+elem)).data.name
        
        return arrayPrommesas1;
    })
    const responses = await Promise.allSettled(promesas);
    responses.forEach((elem)=>{
        if(elem.status == "fulfilled"){
            console.log(elem.value)
        }else{
            console.log(elem.status, "Error")
        }
    })
}
getMultipleCharactersNames([1,2,3])
//console.log(getMultipleCharactersNames([1,2,3]))