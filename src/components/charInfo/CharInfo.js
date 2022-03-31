import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import MarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import {logDOM} from "@testing-library/react";

const CharInfo = (props) => {
    const [char, setChar] = useState({})
    const [comics, setComics] = useState({})
    const marvelService = new MarvelService();
    useEffect(() => {
        marvelService.getCharacterBio(1011334).then(
            res => setChar({
                ...res
            })
        )
    }, []);
    useEffect(() => {
        marvelService.getCharacterBio(props.selectedChar).then(
            res => setChar({
                ...res
            })
        )
    }, [props.selectedChar]);

    const {name, description, id, thumbnail, homepage, wiki} = char;
    return (
        <div className="char__info">
            <div className="char__basics">
                <img src={thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {
                    description
                }
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {char.comics? char.comics.map((item,index) =>  <li key={index} className="char__comics-item">

                    {item.name}
                </li>) : null}
            </ul>
        </div>
    )
}

export default CharInfo;