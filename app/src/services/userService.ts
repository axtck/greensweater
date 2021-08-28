import { authHeader } from "../helpers/authHeader";
import api from "../apis/greensweaterAPI";

const signup = (user: IUserSignupCredentials) => {
    return api.post("/auth/signup", user);
};

// might be converted to async
const login = (user: IUserLoginCredentials) => {
    return api.post("/auth/signin", user)
        .then((user) => {
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        })
        .catch((err) => console.log(err));
};

const logout = () => localStorage.removeItem("user");

export const userService = {
    signup,
    login,
    logout
};
