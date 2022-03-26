import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {
    state = {
        chars:null,
        offset:300
    }
    marvelService = new MarvelService();

    updateChars = () => {
        this.marvelService.getAllCharacters()
            .then(
            res => this.setState(( state)=>{
                return {
                    chars: res
                }
            })
        )
    }
    onLoadChars = () => {

        this.marvelService.getAllCharacters(this.state.offset).then(
            res => this.setState(( {chars,offset})=>{
                return {
                   chars: [...chars,...res],
                    offset: offset+50
                }
            })
        )
    }
    createChars = () => {
        const charsData = this.state.chars.map(char => {
            return(
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
            )
        })
        console.log(this.state);
        console.log(charsData);

    }
    componentDidMount() {
        this.updateChars();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    render() {
        const {chars} = this.state;
        let charsData;
        if(chars){
             charsData = this.state.chars.map(char => {
                return(
                    <li key={char.id} className="char__item">
                        <img style={{objectFit:"contain"}} src={char.thumbnail} alt="abyss"/>
                        <div className="char__name">{char.name}</div>
                    </li>
                )
            })
        }

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {/*<li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>*/}
                    {charsData}

                </ul>
                <button onClick={this.onLoadChars} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

export default CharList;