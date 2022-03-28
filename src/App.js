import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Blogs from "./pages/blogs";
import BlogPage from "./components/blogPage";
import New from "./pages/new";

function App() {
    return (
        <Router>
            <Navbar />
            <div className='container py-4'>
                <Switch>
                    <Route exact path='/'>Index</Route>
                    <Route exact path='/blogs'><Blogs/></Route>
                    <Route exact path='/new'><New/></Route>
                    <Route path='/blog/:identifier'><BlogPage/></Route>
                    <Route exact path='/auth'><Auth /></Route>
                    <Route exact path='/home'><Home /></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
