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
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
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
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'

        }
    }

    return{
        loading, error, clearError,getCharacter,getAllCharacters, getComics,getComic
    }
}

export default useMarvelService;