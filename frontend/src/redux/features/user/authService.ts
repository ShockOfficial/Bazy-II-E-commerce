const login = async (userData: { email: string, password: string }) => {
    const response = await fetch('users/login', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userData)
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.error);
    }

    localStorage.setItem('user', JSON.stringify(json));

    return json;
}

const signup = async (userData: { email: string, password: string }) => {
    const response = await fetch('users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userData)
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.error);
    }

    localStorage.setItem('user', JSON.stringify(json));

    return json;
}

const logout = async () => {
    localStorage.removeItem('user');
}

const authService = {
    login,
    signup,
    logout
};

export default authService;