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

const miFuncion = (name?:string, status?:string, gender?:string)=>{
    const url:string[]=["https://rickandmortyapi.com/api/character/?"]
    if(name){
        url.push("name="+name)
    }
    if(status){
        url.push("status="+status)
    }
    if(gender){
        url.push("gender="+gender)
    }
    const APIUrl = url.reduce((acc, curr, index) => {
        if (index === 0) {       // .at(0)
            return curr;
        }else{
            return acc + (index === 1 ? "" : "&") + curr;
        }
    }, "");
    axios.get(APIUrl).then((response)=>{
        const Personajes:personaje[]=response.data.results
        const final:personaje[]=Personajes.map((m)=>{
            const episodios:episode[]=[]
            if(m.episode.every(e => typeof e === "string")){
                m.episode.forEach((n)=>{
                    axios.get(n).then((response)=>{
                        const episodio:episode = response.data
                        episodios.push(episodio)
                    })
                })
            }
            return {...m, episode: episodios}
        })
        console.log(final)
    })
}
miFuncion("Rick Sanchez")
