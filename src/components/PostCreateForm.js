import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {createPost} from "../api/api";


const PostCreateForm = ({token, setPosts}) => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(null);
    return (
    <form className="ui form" onSubmit={ async (event) => {
        event.preventDefault();

       const {error, post} = await createPost(token, title, description, price, location);

       if (post) {
        setPosts((prevPosts) => [...prevPosts, post]);
        setTitle('');
        setDescription('');
        setPrice('');
        setLocation('');
        history.push('/posts')
       } else {
            alert('Something went wrong! Please make sure you are signed up or logged in!')
            console.error(error);
       }
       
    }}>
        <h4>Create Post</h4>
        <div className="field">
            <label htmlFor="title">Title</label>
            <input name='title'type='text' placeholder="Listing Title" required autoComplete="off" 
            value={title} 
            onChange={(event) => setTitle(event.target.value)}></input>
        </div>
        <div className="field">
            <label htmlFor="description">Description</label>
            <input name='description'type='text' placeholder="Description of the listing" required autoComplete="off"
            value={description} 
            onChange={(event) => setDescription(event.target.value)}></input>
        </div>
        <div className="field">
            <label htmlFor="price">Price</label>
            <input name='price'type='text' placeholder="$" required autoComplete="off"
            value={price} 
            onChange={(event) => setPrice(event.target.value)}></input>
        </div>

        <button type="submit" className="ui button">Create</button>
    </form>
    )
};

export default PostCreateForm;