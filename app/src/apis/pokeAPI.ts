import axios from "axios";

const pokeInstance = axios.create({
    baseURL: "https://pokeapi.co/api/v2/"
});

export default pokeInstance;
