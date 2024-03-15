import { ManageAccountsOutlined, LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.token);

  const uploadRoute = `/upload/${userId}`;
  const deviceListRoute = `/profile/${userId}`;
  const homeRoute = "/home";
  const isHomePage = location.pathname === homeRoute;
  const isUploadPage = location.pathname === uploadRoute;
  const isDeviceListPage = location.pathname === deviceListRoute;

  const getUser = async () => {
    const response = await fetch(`https://techsphere-493f.onrender.com/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [userId, token]);

  if (!user) {
    return null;
  }

  // Ensure that you're extracting the 'friends' data here
  const { firstName, lastName, location: userLocation, occupation, friends = [] } = user; // Default to an empty array if 'friends' is undefined

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem" onClick={() => navigate(`/profile/${userId}`)}>
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography variant="h4" color={theme.palette.text.primary} fontWeight="500" sx={{ "&:hover": { cursor: "pointer", color: theme.palette.primary.light } }}>
              {firstName} {lastName}
            </Typography>
            <Typography color={theme.palette.text.secondary}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined color="action" />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined color="action" />
          <Typography color={theme.palette.text.secondary}>{userLocation}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined color="action" />
          <Typography color={theme.palette.text.secondary}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        
        <FlexBetween>
         
          <Typography variant="h5" color={theme.palette.text.primary} fontWeight="500" sx={{ "&:hover": { cursor: "pointer", color: theme.palette.primary.light } }}>
              Level : 15
            </Typography>
            
        </FlexBetween>
      </Box>

      
      
      {/* FOURTH ROW */}
      

      <Divider />

      {/* Home Text/Button */}
      <Box p="1rem 0">
        {isHomePage ? (
          <Button variant="contained" fullWidth onClick={() => navigate(homeRoute)} sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
            <Typography variant="h6" fontWeight="500">HOME</Typography>
          </Button>
        ) : (
          <Typography variant="h4" onClick={() => navigate(homeRoute)} sx={{ cursor: 'pointer', color: theme.palette.text.primary }}>&gt; Home</Typography>
        )}
      </Box>
      <Divider />

      {/* Upload Device Text/Button */}
      <Box p="1rem 0">
        {isUploadPage ? (
          <Button variant="contained" fullWidth onClick={() => navigate(uploadRoute)} sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
            <Typography variant="h6" fontWeight="500">Upload Device</Typography>
          </Button>
        ) : (
          <Typography variant="h4" onClick={() => navigate(uploadRoute)} sx={{ cursor: 'pointer', color: theme.palette.text.primary }}>&gt; Upload Device</Typography>
        )}
      </Box>
      <Divider />

      {/* Device List Text/Button */}
      <Box p="1rem 0">
        {isDeviceListPage ? (
          <Button variant="contained" fullWidth onClick={() => navigate(deviceListRoute)} sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
            <Typography variant="h6" fontWeight="500">Device List</Typography>
          </Button>
        ) : (
          <Typography variant="h4" onClick={() => navigate(deviceListRoute)} sx={{ cursor: 'pointer', color: theme.palette.text.primary }}>&gt; Device List</Typography>
        )}
      </Box>

    </WidgetWrapper>
  );
};

export default UserWidget;
