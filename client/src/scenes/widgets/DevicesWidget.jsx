import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUploads } from "state";
import DeviceWidget from "./DeviceWidget";

const DevicesWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.uploads);
  const token = useSelector((state) => state.token);

  const getUserUploads = async () => {
    const response = await fetch(
      `https://techsphere-493f.onrender.com/uploads/${userId}/uploads`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setUploads({ uploads: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserUploads();
    }
  }, [userId, isProfile, dispatch, token]); // Added dependencies

  return (
    <>
      {uploads.map((upload) => (
         <DeviceWidget
          key={upload._id}
          productId={upload._id} // Pass the product ID to the DeviceWidget
          picturePath={upload.picturePath}
          productName={upload.productName}
          productPrice={upload.productPrice}
          productRating={upload.productRating}
          productReview={upload.productReview}
          purchaseDate={upload.purchaseDate}
        />
      ))}
    </>
  );
};

export default DevicesWidget;
