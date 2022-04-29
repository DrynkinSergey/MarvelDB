import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import {useState} from "react";

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onSelectedChar = (id) => {
        setChar(id)
    }
    return (
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onCharSelected={onSelectedChar}/>
                <ErrorBoundary>
                    <CharInfo selectedChar={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}
export default MainPage;