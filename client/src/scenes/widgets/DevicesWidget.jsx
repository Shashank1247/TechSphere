import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { setUploads } from "state";
import PostWidget from "./PostWidget";
import DeviceWidget from "./DeviceWidget"

const DevicesWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.uploads);
  const token = useSelector((state) => state.token);

  const getUserUploads = async () => {
    const response = await fetch(
      `http://localhost:3001/uploads/${userId}/uploads`,
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {uploads.map(
        ({
        
          picturePath,
      
        }) => (
          /*
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
          */
         <DeviceWidget
          
          picturePath = {picturePath}

         />
        )
      )}
    </>
  );
};

export default DevicesWidget;
