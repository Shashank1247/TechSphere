import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useNavigate } from 'react-router-dom';

const DeviceWidget = ({
  productId,
  picturePath,
  productName,
  productPrice,
  productRating,
  productReview,
  purchaseDate,
}) => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${productId}`); // Navigate to the product detail page
  };

  return (
    <WidgetWrapper onClick={handleClick} sx={{ cursor: 'pointer', margin: '2rem 0', padding: '1rem', borderRadius: '0.75rem' }}>
      <Typography 
      variant="h5" // You can choose the variant that suits your size needs; h5 is just an example.
      sx={{
        fontWeight: 'bold',
        color: palette.primary.main,
        marginBottom: '0.5rem',
        fontFamily: 'YourCustomFont, sans-serif', // Fallback to sans-serif if the custom font isn't available.
        fontSize: '1.5rem', // Example size, adjust as needed.
      }}>
        {productName}
      </Typography>
      
      {picturePath && (
        <img
          src={`https://techsphere-493f.onrender.com/assets/${picturePath}`}
          alt={productName}
          style={{ width: '100%', height: 'auto', borderRadius: '0.75rem', marginBottom: '1rem' }}
        />
      )}
     
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="body1" sx={{ flexGrow: 1 } }>
          Price: ${productPrice}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'right' }}>
          Purchase Date: {purchaseDate}
        </Typography>
        
      </Box>
      {/* You can also include productRating and productReview if needed */}
    </WidgetWrapper>
  );
};

export default DeviceWidget;
