import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ComicsPage, MainPage, PageNotFound, SingleComic} from "../pages";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route  path='/' element={<MainPage/>}/>
                        <Route  path='/comics' element={<ComicsPage/>}/>
                        <Route  path='/comics/:comicId' element={<SingleComic/>}/>
                        <Route  path='*' element={<PageNotFound/>}/>
                    </Routes>
                </main>
                {/*
                <SingleComic/>*/}
            </div>

        </Router>
    )
}


export default App;