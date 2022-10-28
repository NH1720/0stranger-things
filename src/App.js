import React from "react";
import {Home} from "./components"
import {Route, Switch, Links} from "react-router-dom";

const App = () => {
    return (
        <div>
            <nav></nav>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    )
}

export default App; 