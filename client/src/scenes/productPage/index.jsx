import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const { productId } = useParams();
  const token = useSelector((state) => state.token);
  const [product, setProduct] = useState(null); // State to hold the fetched product details

  useEffect(() => {
    const getDevice = async () => {
      const response = await fetch(
        `https://techsphere-493f.onrender.com/uploads/${productId}/device`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProduct(data); // Store the fetched product details in state
      } else {
        console.error('Failed to fetch product details');
      }
    };

    getDevice();
  }, [productId, token]);

  if (!product) return <div>Loading...</div>; // Show loading or a placeholder while product data is being fetched

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          width: '100%',
          padding: isNonMobileScreens ? '2rem 6%' : '2rem 1rem',
          display: 'flex',
          flexDirection: isNonMobileScreens ? 'row' : 'column',
          gap: '2rem',
          bgcolor: theme.palette.background.default,
        }}
      >
        {/* Left Part: Product Image, Name, Price, and Rating */}
        <Box
          sx={{
            flexBasis: isNonMobileScreens ? '40%' : '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            bgcolor: theme.palette.background.paper,
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: theme.shadows[2],
          }}
        >
          <img
            src={`https://techsphere-493f.onrender.com/assets/${product.picturePath}`}
            alt={product.productName}
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
            {product.productName}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
            Product Price: ${product.productPrice}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
            Rating: {product.productRating}
          </Typography>
        </Box>

        {/* Right Part: Product Specifications and User Reviews */}
        <Box
          sx={{
            flexBasis: isNonMobileScreens ? '60%' : '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          {/* Product Specifications */}
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: theme.shadows[2],
            }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
              Specifications
            </Typography>
            <Typography sx={{ color: theme.palette.text.secondary }}>
              Purchase Date: {product.purchaseDate}
            </Typography>
            {/* Include more specifications here */}
          </Box>

          {/* User Reviews */}
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: theme.shadows[2],
            }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
              Review
            </Typography>
            <Typography sx={{ color: theme.palette.text.secondary }}>
              {product.productReview}
            </Typography>
            {/* Include more reviews here */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
