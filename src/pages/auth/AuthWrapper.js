import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import bgImg from "../../assets/images/SuzlonBackground.jpg"

const AuthWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bgImg})`,
        objectFit: "contain"
      }}
    >
      <Card
        sx={{
          maxWidth: 1000,
          minHeight: { xs: 320, sm: 380, md: 450 },
          width: { xs: "100%", sm: "50%", lg: 450 },
          overflow: "hidden",
          position: "relative",
          display: "flex",
          borderRadius: "0px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: { xs: 5, lg: 15 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Card>
    </Box>
  );
};

export default AuthWrapper;
