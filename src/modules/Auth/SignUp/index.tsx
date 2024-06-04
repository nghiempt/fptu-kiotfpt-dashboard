import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import * as Components from "./component";
import { ROUTE } from "../../../routes/constant";
import { heightScreen } from "../../../utils/constant";

const SignUpPage: React.FC = () => {

  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async () => {
    // navigate(ROUTE.SELLER);
  }

  const goToSignIn = () => {
    navigate(ROUTE.SIGN_IN);
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
              <Components.Title>Create New Account</Components.Title>
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
            <Components.Input
              type={"password"}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            <Box
              sx={{
                paddingTop: 3,
              }}
            >
              <Box onClick={handleSubmit}>
                <Components.Button onClick={(e: any) => e.preventDefault()}>
                  Sign Up
                </Components.Button>
              </Box>
            </Box>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer>
          <Components.Overlay>
            <Components.LeftOverlayPanel>
              <Components.Title>Comeback!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Box onClick={goToSignIn}>
                <Components.GhostButton>Sign In</Components.GhostButton>
              </Box>
            </Components.LeftOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </Box>
  );
};
export default SignUpPage;
