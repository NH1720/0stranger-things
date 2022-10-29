import React, { useState, useEffect } from "react";
import {Home, Posts, AccountForm } from "./components"
import {Route, Switch, Link, useHistory} from "react-router-dom";
import { fetchPosts, fetchUser } from "./api/api";
import "./App.css"

const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const {error, posts} = await fetchPosts()
                if (error) {
                    console.error(error);
                }
                setPosts(posts);
            } catch(error) {
                console.error(error)
            }
        }; 
        getPosts();
    }, []);

useEffect(() => {
    if (token) {
        const getUser = async () => {
            const {username} = await fetchUser(token);
            console.log("username", username)
            setUser(username)
        }
        getUser();
    }
}, [token])

useEffect(() => {
    window.localStorage.setItem("token", token)
}, [token]);


const logout = () => {
    setToken("");
    setUser(null);
    history.push("/");
}


    return (
        <div className="container">
            <nav className="ui secondary menu">
                <Link className="item" to="/">Home</Link>
                <Link className="item" to="/posts">Posts</Link>

                <div className="right menu">
                    {token ? (
                        <button onClick={logout}className="item">Logout</button>
                    ): (
                    <>
                    <Link className="item" to="/accountform/login">Login</Link>
                    <Link className="item" to="/accountform/register">Sign Up</Link> 
                    </>
                    )
                    }
                </div>
            </nav>
            <Switch>
                <Route exact path="/">
                    <Home user={user} />
                </Route>
                <Route className="item" path="/posts">
                    <Posts posts={posts}/>
                </Route>
                <Route className="item" path="/accountform/:action">
                    <AccountForm setToken={setToken}/>
                </Route>
            </Switch>
        </div>
    )
}

export default App; 