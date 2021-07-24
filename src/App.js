import './App.css';
import Home from "./components/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Document from "./components/Document";

function App() {

    return (
        <Router>
            <Switch>
                <Route path={'/'} exact>
                    <Home />
                </Route>
                <Route path={'/comments/:id'}>
                    <Document />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
