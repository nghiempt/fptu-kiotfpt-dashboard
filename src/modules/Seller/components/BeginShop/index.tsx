import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { heightScreen } from "../../../../utils/constant";
import * as Components from "./component";
import { ROUTE } from "../../../../routes/constant";

const BeginShop: React.FC = () => {

  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async () => {
    navigate(ROUTE.SELLER);
  }

  const goToSignUp = async () => {
    navigate(ROUTE.ADMIN);
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: heightScreen / 1.3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Components.Container>
        <Components.SignInContainer>
          <Components.Form>
            <Box
              sx={{
                marginTop: 3,
                marginBottom: 1,
              }}
            >
              <Components.Title>Sign-in to KIOTFPT</Components.Title>
            </Box>
            <Components.Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
            />
            <Components.Input
              type={"password"}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Box
              sx={{
                paddingTop: 3,
              }}
            >
              <Box onClick={handleSubmit}>
                <Components.Button onClick={(e: any) => e.preventDefault()}>
                  Sign In
                </Components.Button>
              </Box>
            </Box>
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer>
          <Components.Overlay>
            <Components.LeftOverlayPanel>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Box onClick={goToSignUp}>
                <Components.GhostButton>Sign Up</Components.GhostButton>
              </Box>
            </Components.LeftOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </Box>
  );
};
export default BeginShop;
