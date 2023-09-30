import Axios from "axios";
import { SERVER_BASE_URL } from "../config.js";
import * as React from "react";
import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Grid } from "@mui/material";
const ProductByCategory = ({ category }) => {

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

    const itemsByCategory = {};

    electronicsFiltered.forEach((item) => {
        if (!itemsByCategory[item.category]) {
            itemsByCategory[item.category] = [];
        }
        itemsByCategory[item.category].push(item);
    });

    const groupedItems = Object.entries(itemsByCategory);

    return (
        <div>
            {groupedItems.map(([category, items]) => (
                <div className="ele" key={category}>
                    <Card sx={{ maxWidth: 345 }} variant="outlined">
                        <CardContent>
                            <h1>{category}</h1>
                            <Grid container direction={"row"} spacing={2}>
                                {items.map((item) => (
                                    <Grid item key={item._id} direction={"row"}>
                                        <div>
                                            <h2>{item.title}</h2>
                                            <h3>{item.price.amount}</h3>
                                            <CardMedia>
                                                <img
                                                    src={item.images[0]}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    width={100}
                                                />
                                            </CardMedia>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            ))
            }
        </div>
    );
}

export default ProductByCategory;