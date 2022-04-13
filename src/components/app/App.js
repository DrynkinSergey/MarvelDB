import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import {Component} from "react";

class App extends Component {
    state = {
        selectedChar: null
    }
    onSelectedChar = (id) => {
        console.log(1)
        this.setState({
            selectedChar:id
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onCharSelected={this.onSelectedChar}/>
                       <ErrorBoundary>
                           <CharInfo selectedChar={this.state.selectedChar}/>
                       </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;