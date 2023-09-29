import Axios from "axios";
import {SERVER_BASE_URL} from "../config.js";
import * as React from "react";
import {useEffect} from "react";

const ProductByCategory = ({category}) => {

    const filterDataByCategory = async (category) => {
        const res = await Axios.get(SERVER_BASE_URL + `/products?category=${category}`);
        if (res.status === 200) {
            return res.data;
        }
    };

    const [electronicsFiltered, setElectronicsFilteredProducts] = React.useState([]);

    useEffect(() => {
        filterDataByCategory(category).then((data) => {
            setElectronicsFilteredProducts(data);
        });
    });

    return (
        <div>
            {electronicsFiltered.map((item) => {

                    return <div className="ele" key={item._id}>
                        <h1>{item.title}</h1>
                        <h2>{item.price.amount}</h2>
                        <h3>{item.description}</h3>
                        <img
                            src={item.images[0]}
                            alt={item.title}
                            loading="lazy"
                            width={100}
                        />
                    </div>
                }
            )}
        </div>
    );
}

export default ProductByCategory;