import './singleComic.scss';
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import Spinner from "../spinner/spinner";
import {Link, useParams} from "react-router-dom";
import ErrorMessage from "../errorMessage/errorMessage";

const SingleComic = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {error,loading,getComics,clearError} =  useMarvelService();


    useEffect(() => {
        updateComic(comicId)
    }, [comicId])

    const updateComic = (comicId) => {
        clearError();
        getComics(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>

    )
}
const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}


export default SingleComic;