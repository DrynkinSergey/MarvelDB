import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";

const ComicsList = () => {
    const {getComics} = useMarvelService();
    useEffect(() => {
        const id = Math.floor(Math.random() * (1011 - 2011) + 1011);
        setOffset(id)
        onRequest();
    }, [])

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(234)
    const onRequest = () => {
        getComics(offset)
            .then(onCharListLoaded)
    }
    const onCharListLoaded = (newChars) => {
        setComics(
                [...comics, ...newChars],
        )
        setOffset(offset => offset + 9 )
    }

    const RenderComics = () => {

        return (
            <ul className="comics__grid">
                {
                    comics.map((item,index) =>
                        <li key={`${item.id} ${index}`} className="comics__item">
                            <a href="#">
                                <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                                <div className="comics__item-name">{item.title}</div>
                                <div className="comics__item-price">{item.price? `${item.price}$` : `Not available`}</div>
                            </a>
                        </li>
                    )
                }
            </ul>
            )


    }
    return (
        <div className="comics__list">
            <RenderComics/>
            <button
                onClick={onRequest}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;