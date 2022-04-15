/*
import './charInfo.scss';
import MarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";

const CharInfo = (props) => {
    const [char, setChar] = useState({})
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

    const {name, description, thumbnail, homepage, wiki} = char;
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
                        <a target='_blank' href={wiki} className="button button__secondary">
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

export default CharInfo;*/
import {Component} from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedChar !== prevProps.selectedChar) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {selectedChar} = this.props;
        if (!selectedChar) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacterBio(selectedChar)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit': 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
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
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.map((item, i) => {
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}


export default CharInfo;