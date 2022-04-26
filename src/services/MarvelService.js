import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();


   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=3839aab5cda235b2a0d9aeb4e2224543';



   const getAllCharacters = async (offset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

        return res.data.results.map(_transformCharacter);
    }

    const getComics = async (offset) => {
        const res = await request(`${_apiBase}comics?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }
    const getSingleComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return res.data.results[0];
    }


   const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
       if (res.code === 404) return
       return _transformCharacter(res.data.results[0]);
    }

   const _transformCharacter = (char) => {
      let description = !char.description ? `The ${char.name} has not description! Sorry...`:char.description;

        return {
            name: char.name,
            description:(char.description < 177 ? description : description=description.slice(0,177)+'...'),
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id:char.id,
            comics:char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            title: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price,
            id:comics.id,
            description: comics.description,

        }
    }

    return{
        loading, error, clearError,getCharacter,getAllCharacters, getComics,getSingleComics
    }
}

export default useMarvelService;