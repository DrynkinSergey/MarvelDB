import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import {useState} from "react";
import SingleComic from "../singleComic/SingleComic";
import ComicsList from "../comicsList/ComicsList";

const App = () => {
    const [selectedChar, setChar] = useState(null);

    const onSelectedChar = (id) => {
        setChar(id)
    }

    return (
        <div className="app">
            <AppHeader/>
           {/* <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList onCharSelected={onSelectedChar}/>
                    <ErrorBoundary>
                        <CharInfo selectedChar={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>*/}
            <SingleComic/>
            <ComicsList/>
        </div>
    )
}


export default App;