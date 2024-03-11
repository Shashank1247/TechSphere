import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import UploadWidget from "scenes/widgets/UploadWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProductPage = () => {

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="space-bewtween"
      >
         <div style={{ display: 'flex', width: '100%' }}>
      {/* Left part (30%) */}
      <div style={{ flexBasis: '30%', padding: '20px' }}>
        {/* Image */}
        <img src="http://localhost:3001/assets/rrrimage.png" alt="Product" style={{ width: '100%', marginBottom: '20px' }} />
        {/* Name */}
        <h2>Product Name</h2>
        {/* Price */}
        <p>$Price</p>
      </div>

      {/* Right part (70%) */}
      <div style={{ flexBasis: '70%', padding: '20px', overflowY: 'auto', height: '100vh' }}>
        {/* Product Specifications */}
        <div>
          <h3>Specifications</h3>
          <p>Detail 1</p>
          <p>Detail 2</p>
          {/* Add more specifications as needed */}
        </div>

        {/* User Reviews */}
        <div style={{ marginTop: '20px' }}>
          <h3>User Reviews</h3>
          <p>Review 1</p>
          <p>Review 2</p>
          {/* Add more reviews as needed */}
        </div>
      </div>
    </div>
      
      </Box>
    </Box>
    
  );
};

export default ProductPage;
