import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import SuggestedFriendsWidget from "scenes/widgets/SuggestedFriendsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          sx={{
            height: '100vh', // Set the height to full viewport height
            overflowY: 'auto', // Enable vertical scrolling
            '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Webkit browsers
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            '-ms-overflow-style': 'none'  // Hide scrollbar for IE and Edge
          }}

        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
           
            <Box />
            <FriendListWidget userId={_id} />
            <SuggestedFriendsWidget userId={_id} />
          </Box>
          
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
