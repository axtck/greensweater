import axios from "axios";

const instance = (token: string) => {
    axios.create({
        baseURL: `url`,
        timeout: 1000,
        headers: { 'authorization': 'Bearer ' + token }
    });
};

export default instance;