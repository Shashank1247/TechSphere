import { Box, useTheme } from "@mui/material";
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
    <WidgetWrapper m="2rem 0" onClick={handleClick} sx={{ cursor: 'pointer' }}>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt={productName}
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      {/* Display other product details as needed */}
    </WidgetWrapper>
  );
};

export default DeviceWidget;
