import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";

const SingleComic = () => {

    const [comics, setComics] = useState([]);
    const [th,setTh] = useState('')
    const {getSingleComics} = useMarvelService();
    const onRequest= () => {
        getSingleComics(321)
            .then(res => {
                setComics(res)
                setTh(res.thumbnail.path + res.thumbnail.extension)
            })
    }
    useEffect(() => {
        onRequest()

    }, []);


    return (
        <div className="single-comic">
            <img src={th} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comics.title}</h2>
                <p className="single-comic__descr">{comics.description}</p>
                <p className="single-comic__descr">144 pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">9.99$</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}

export default SingleComic;