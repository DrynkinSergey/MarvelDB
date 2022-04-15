import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import React, {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 300
    }
    marvelService = new MarvelService();

    ref = React.createRef()
    onRequest = () => {

        this.marvelService.getAllCharacters(this.state.offset)
            .then(this.onCharListLoaded)
    }
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }
    onCharListLoaded = (newChars) => {
        this.setState(({chars, offset}) => {
            return {
                chars: [...chars, ...newChars],
                offset: offset + 9,
                loading: false,
                newItemLoading: false
            }
        })
    }

    onCharSelect = (id) => {
        this.props.onCharSelected(id);
    }
    createChars = () => {
        this.state.chars.map(char => {
            return (
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
            )
        })
    }
    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }
    focusOnItem = (id) => {

        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }
    componentDidMount() {
        this.onRequest();
    }

    renderChars = () => {

        const items = this.state.chars.map((char, i) => {
                let imgStyle = {'objectFit' : 'cover'};
                if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    imgStyle = {'objectFit' : 'unset'};
                }
                return (
                    <li onClick={() => {
                        this.onCharSelect(char.id);
                        this.focusOnItem(i);
                    }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                this.props.onCharSelected(char.id);
                                this.focusOnItem(i);
                            }
                        }}
                        ref={this.setRef}
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

    render() {
        const {chars,loading, error} = this.state;
        const items = this.renderChars(chars);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;


        return (
            <div className="char__list">
                    {errorMessage}
                    {spinner}
                    {content}
                <button onClick={this.onRequest} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

export default CharList;