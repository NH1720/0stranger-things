import React from "react";
import {Home, Posts} from "./components"
import {Route, Switch, Link} from "react-router-dom";

const App = () => {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/posts">Posts</Link>
            </nav>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/posts">
                    <Posts />
                </Route>
            </Switch>
        </div>
    )
}

export default App; 