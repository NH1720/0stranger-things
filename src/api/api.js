

const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT"


const makeHeaders = (token) => {
    const headers = {
        'Content-Type': 'application/json'
    }; 

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    };
    return headers;
};


export const callAPI = async (endpointPath, defaultOptions={}) => {
    const {token, method, body} = defaultOptions;
    const options = {
        headers: makeHeaders(token),
    };

    if (method) {
        options.method = method;
    };

    if (body) {
        options.body = JSON.stringify(body);
    }
    console.log('token test', token)
    const response = await fetch(`${BASEURL}${endpointPath}`, options);
    const result = await response.json();

    return result;
};
   


export const fetchPosts = async (token) => {
    try {
        const {success, error, data} = await callAPI('/posts', {
            token: token,
        });

        if (success) {
            return {error: null, posts: data.posts}
        } else {
            return {
                error: error.message, 
                posts: []
            };
        }
    } catch (error) {
    console.error("Error fetching the posts", error);

    return {
        error: 'Failed to load Posts', 
        posts: [],
        };
    }
};

export const registerUser = async(username, password) => {
try {
   const {success, error, data} = await callAPI('/users/register', {
        method: "POST",
        body: {
            user: {
                username,
                password,
            },
        }
    });
    console.log(data)
    if (success) {
        return {
            error: null, 
            token: data.token,
            message: data.message,
        }
    } else {
        return {
            error: error.message,
            token: null,
            message: null,
        }
    }
} catch(error) {
console.error('There was an error when registering the user', error);

return {
    error: "Registration Failed.",
    token: null, 
    message: null,
}
}
}; 






export const loginUser = async(username, password) => {
    try {
       const {success, error, data} = await callAPI('/users/login', {
            method: "POST",
            body: {
                user: {
                    username,
                    password,
                },
            }
        });
        console.log(data)
        if (success) {
            return {
                error: null, 
                token: data.token,
                message: data.message,
            }
        } else {
            return {
                error: error.message,
                token: null,
                message: null,
            }
        }
    } catch(error) {
    console.error('There was an error when registering the user', error);
    
    return {
        error: "Registration Failed.",
        token: null, 
        message: null,
    }
    }
    }; 




export const fetchUser = async (token) => {
try {
    const {success, error, data} = await callAPI('/users/me', {
        token: token, 
    }); 
    console.log(data, 'data in fetchUser')
    if (success) {
        return {
            error: null, 
            username: data.username, 

        }
    } else {
        return {
            error: error.message, 
            username: null,
        }
    }

} catch(error) {
    console.error('failed to fetch user',error)

    return {
        error: 'Failed to load User Information',
        username: null
    }
}
};

export const createPost = async (token, title, description, price, location, willdeliver) => {
   try {
    const {success, error, data} = await callAPI('/posts', {
        token: token,
        method: 'POST', 
        body: {
            post: {
                title: title, 
                description: description, 
                price: price, 
                location: location, 
                willdeliver: willdeliver
            }
        }
    });
    console.log(data)
    if (success) {
        return {
            error: null,
            post: data.post
        } 
    } else {
        return {
            error: error.message,
            post: null
        }
    }
   } catch (error) {
    console.error('POST /posts failed: ', error);

    return {
        error: "Failed to create Post"
    };
   }
};


export const deletePost = async(token, postID) => {
    try {
        await fetch(`${BASEURL}/posts/${postID}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, 
                },
        }); 
    } catch (error) {
        console.error("DELETE/posts/postID failed:", error)
    }
}


export const addMessage = async (token, postID, message) => {
    try {
    const {success, error, data} = await callAPI(`/posts/${postID}/messages`, {
        token: token, 
        method: "POST", 
        body: {
            message: {
                content: message
            },
        },
    });

    if (success) {
        return {
            success: success,
            error: null,
            message: data.message,
        } 
    } else {
        return {
            success: success,
            error: error.message,
            message: null
        }
    }
   } catch (error) {
    console.error(`POST /posts/${postID/messages} failed: `, error);

    return {
        success: false,
        error: "Failed to create message for post", 
        message: null,
    };
   }

};