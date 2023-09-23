import { useState } from "react";
import Axios from "axios";

const Home = () => {

    const URL = "http://localhost:8000";


    Axios.get(URL + "/users").then((response) => {
        console.log(response.data);
    }
    );
}

export default Home;