import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ProductCard({ product }) {
    return (
        

        
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                {/* <CardMedia
                    component="img"
                    height="140"
                    image="https://via.placeholder.com/150" // Placeholder image URL
                    alt={product.productName}
                /> */}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Company: {product.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Category: {product.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: ${product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Discount: {product.discount}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rating: {product.rating} / 5
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Availability: {product.availability}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
       
    );
}
