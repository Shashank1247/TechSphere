import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SuggestedFriendsWidget = ({ userId }) => {
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const [suggestedFriends, setSuggestedFriends] = useState([]);

  const getSuggestedFriends = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/suggested-friends`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setSuggestedFriends(data); // Update the state with fetched data
      } else {
        console.error("Expected an array of suggested friends, but got:", data);
      }
    } catch (error) {
      console.error("Failed to fetch suggested friends:", error);
    }
  };

  useEffect(() => {
    getSuggestedFriends();
  }, [userId, token]); // Added dependencies to the useEffect

  return (
    <WidgetWrapper>
      <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>
        Suggested Friends
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {suggestedFriends.map((friend) => (
          <Friend key={friend._id} friendId={friend._id} name={`${friend.firstName} ${friend.lastName}`} subtitle={friend.occupation} userPicturePath={friend.picturePath} />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default SuggestedFriendsWidget;
