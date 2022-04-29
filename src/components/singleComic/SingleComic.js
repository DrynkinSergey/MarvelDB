import './singleComic.scss';
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import Spinner from "../spinner/spinner";

const SingleComic = () => {

    const [comics, setComics] = useState(null);
    const {getSingleComics} = useMarvelService();
    const onRequest= () => {
        getSingleComics(31)
            .then(res => {
                setComics(res)
            })
    }
    useEffect(() => {
        onRequest()
    }, []);

const RenderComics = () =>{
    return (<div className="single-comic">  <img src={comics.thumbnail.path + '.'+ comics.thumbnail.extension} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comics.title}</h2>
                <p className="single-comic__descr">{comics.description}</p>
                <p className="single-comic__descr">144 pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{comics.prices[0].price}$</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </div>

    )
}
    const content = comics ? <RenderComics/> : <Spinner/>
    return (
        <>
            { content }
        </>

    )
}

export default SingleComic;