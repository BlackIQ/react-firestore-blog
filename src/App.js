import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";

function App() {
    return (
        <Router>
            <Navbar />
            <div className='container py-4'>
                <Switch>
                    <Route exact path='/'>Index</Route>
                    <Route exact path='/home'><Home /></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
