import Axios from "axios";
import { SERVER_BASE_URL } from "../config.js";
import * as React from "react";
import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const ProductByCategory = ({ category, sx }) => {

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
        <Container sx={sx}>
            {groupedItems.map(([category, items]) => (
                <div key={category}>
                    <Card  variant="outlined">
                        <CardContent>
                            <h1>{category}</h1>
                            <Grid container direction={"row"} spacing={2}>
                                {items.map((item) => (
                                    <Grid item xs key={item._id}>
                                        <Box >
                                            <Typography component={"h1"} variant={"h4"} >{item.title}</Typography>
                                            <Typography component={"p"} variant={"subtitle1"}>{
                                                item.price.amount.toLocaleString('en-IN', {
                                                maximumFractionDigits: 2,
                                                style: 'currency',
                                                currency: item.price.currency,
                                            })

                                            }</Typography>
                                            <CardMedia>
                                                <img
                                                    src={item.images[0]}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    width={100}
                                                />
                                            </CardMedia>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            ))
            }
        </Container>
    );
}

export default ProductByCategory;