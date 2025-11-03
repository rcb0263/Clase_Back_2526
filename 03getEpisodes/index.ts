import axios from "axios";
type episode ={
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string,
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
    episode: string[],
    url: string,
    created: string,
}

const getCharacterTheRightWay = async (id:number) =>{
    try {
        const res:personaje = (await axios.get(`https://rickandmortyapi.com/api/character/${id}`)).data;
        const episodios:string[] = res.episode;
        const episodiosResueltos = episodios.map(async (elem)=>{
            return (await axios.get(elem)).data
        });
        const responses:episode[] = await Promise.all(episodiosResueltos);
        return responses;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("Axios error: "+ error.message)
        }else{
            console.log("Error: "+ error)
        }
    }
}

const personaje = await getCharacterTheRightWay(1)
console.log(personaje)