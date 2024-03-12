import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import { useNavigate } from 'react-router-dom';

import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import DevicesWidget from "scenes/widgets/DevicesWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate(); // Use the useNavigate hook

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  if (!user) return null;

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
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box  />
       
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          //onClick={handleDevicesWidgetClick}
          sx={{
            cursor: "pointer",
            height: '100vh', // Set the height to full viewport height
            overflowY: 'auto', // Enable vertical scrolling
            '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Webkit browsers
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            '-ms-overflow-style': 'none'  // Hide scrollbar for IE and Edge
          }}
 // Apply styles directly to make the cursor a pointer
        >
        
          <DevicesWidget userId={userId} isProfile />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Box  />
            <FriendListWidget userId={userId} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
