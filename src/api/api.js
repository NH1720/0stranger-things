

const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT"


// export const fetchPosts = async () => {
//         try {
//     const response = await fetch(`${BASEURL}/posts`);
//     console.log('this is the response', response);
//     const {data} = await response.json();
//     console.log('this is data', data.posts);
//     return data.posts;
//     } catch (error) {
//         console.error("Error fetching the posts", error);
//     }
// }

// export const registerUser = async(username, password) => {
//     try {
//     const response = await fetch(`${BASEURL}/users/register`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             user: {
//                 username,
//                 password,
//             },
//         }),
//     });
//     console.log('response', response)
//     const data = await response.json();
//     console.log('data', data);
//     return data; 
// } catch(error) {
//     console.error('There was an error when registering the user', error);
// }
// }; 



// export const fetchUser = async (token) => {
//     try {
//         const response = await fetch(`${BASEURL}/users/me`, {headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//         });
//         console.log("user-response", response);
//         const {data} = await response.json();
//         console.log("user-data", data)
//         return data;
//     } catch (error) {
//         console.error(error);
//     }
// };


export const createPost = async () => {

}

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
    const options = {
        headers: makeHeaders(defaultOptions.token),
    };

    if (defaultOptions.method) {
        options.method = defaultOptions.method;
    };

    if (defaultOptions.body) {
        options.body = JSON.stringify(defaultOptions.body);
    }
    
    const response = await fetch(`${BASEURL}${endpointPath}`, options);
    const result = await response.json();

    return result;
};
   


export const fetchPosts = async () => {
    try {
        const {success, error, data} = await callAPI('/posts');

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