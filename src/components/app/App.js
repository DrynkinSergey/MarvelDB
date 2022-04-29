import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ComicsPage, MainPage} from "../pages";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path='/'>
                            <MainPage/>
                        </Route>
                        <Route exact path='/comics'>
                            <ComicsPage/>
                        </Route>
                    </Switch>
                </main>
                {/*
                <SingleComic/>*/}
            </div>

        </Router>
    )
}


export default App;