import React from "react";
import {Home, Posts} from "./components"
import {Route, Switch, Links} from "react-router-dom";

const App = () => {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/">Posts</Link>
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