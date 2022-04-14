import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {
    state = {
        chars: [],
        loading: false,
        error: false,
        newItemLoading: false,
        offset: 300
    }
    marvelService = new MarvelService();

    onRequest = () => {

        this.marvelService.getAllCharacters(this.state.offset)
            .then(this.onCharListLoaded)
    }

    onCharListLoaded = (newChars) => {
        this.setState(({chars, offset}) => {
            return {
                chars: [...chars, ...newChars],
                offset: offset + 9,
                loading:false,
                newItemLoading:false            }
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
    componentDidMount() {
        this.onRequest();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        const {chars} = this.state;
        let charsData;
        if (chars) {
            charsData = this.state.chars.map(char => {
                return (
                    <li onClick={() => this.onCharSelect(char.id)} key={char.id} className="char__item">
                        <img style={{objectFit: "contain"}} src={char.thumbnail} alt="abyss"/>
                        <div className="char__name">{char.name}</div>
                    </li>
                )
            })
        } else {
             charsData = 'Not found'
        }

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charsData}

                </ul>
                <button onClick={this.onRequest} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

export default CharList;