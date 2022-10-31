import React, { useState, useEffect } from "react";
import {Home, Posts, PostDetail, AccountForm, PostCreateForm } from "./components"
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
                const {error, posts} = await fetchPosts(token)
                if (error) {
                    console.error(error);
                }
                setPosts(posts);
            } catch(error) {
                console.error(error)
            }
        }; 
        getPosts();
    }, [token]);

useEffect(() => {
    if (token) {
        const getUser = async () => {
            const {username} = await fetchUser(token);
            setUser(username)
        }
        getUser();
    }
}, [token])

useEffect(() => {
    if (token) {
        window.localStorage.setItem("token", token)
    } else {
        window.localStorage.removeItem("token")
    }
}, [token]);


const logout = () => {
    setToken(null);
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
                <Route className="item" path="/posts/create">
                    <PostCreateForm token={token} setPosts={setPosts} />
                </Route>
                <Route className="item" path="/posts/:postID">
                    <PostDetail token={token} posts={posts}/>
                </Route>
                <Route className="item" path="/posts">
                    <Posts posts={posts} token={token} setPosts={setPosts}/>
                </Route>
                <Route className="item" path="/accountform/:action">
                    <AccountForm setToken={setToken}/>
                </Route>
            </Switch>
        </div>
    )
}

export default App; 