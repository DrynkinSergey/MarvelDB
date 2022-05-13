import AppHeader from "../appHeader/AppHeader";
import {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Spinner from "../spinner/spinner";

const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComic = lazy(() => import('../pages/SingleComic'))
const PageNotFound = lazy(() => import('../pages/404'))

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/comics' element={<ComicsPage/>}/>
                            <Route path='/comics/:comicId' element={<SingleComic/>}/>
                            <Route path='*' element={<PageNotFound/>}/>
                        </Routes>
                    </Suspense>

                </main>
            </div>

        </Router>
    )
}


export default App;