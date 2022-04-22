import './charList.scss';
import React, { useEffect, useState} from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import useMarvelService from "../../services/MarvelService";

const CharList = (props) => {

    const {loading,error,getAllCharacters} = useMarvelService();

    const [state, setState] = useState(
        {
            chars: [],
            newItemLoading: false,
            offset: 300
        }
    );



    const onRequest = () => {
        getAllCharacters(state.offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newChars) => {
        setState(
            {
                ...state,
                chars: [...state.chars, ...newChars],
                offset: state.offset + 9,

                newItemLoading: false
            }
        )
    }

    const onCharSelect = (id) => {
        props.onCharSelected(id);
    }
    const itemRefs = [];

    const setRef = (ref) => {
        itemRefs.push(ref);
    }
    const focusOnItem = (id) => {

        itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs[id].classList.add('char__item_selected');
        itemRefs[id].focus();
    }
    useEffect(() => {
        onRequest();
    }, [])

    const renderChars = () => {

        const items = state.chars.map((char, i) => {
            let imgStyle = {'objectFit': 'cover'};
            if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }
            return (
                <li onClick={() => {
                    onCharSelect(char.id);
                    focusOnItem(i);
                }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(char.id);
                            focusOnItem(i);
                        }
                    }}
                    ref={setRef}
                    tabIndex={0}
                    key={char.id} className="char__item">
                    <img style={imgStyle} src={char.thumbnail} alt="abyss"/>
                    <div className="char__name">{char.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )

    }
    const {chars} = state
    const items = renderChars(chars);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button onClick={onRequest} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;