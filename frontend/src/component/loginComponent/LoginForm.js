import React, { useContext } from "react";
import {
  BoldSpan,
  BoxContainer,
  SmallSpan,
  SubmitButton,
  Marginer,
  BreakLine,
} from "./CommonStyle";
import { CssTextField } from "./CommonMuiStyle";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MuiStyle from "./MuiStyle";
import GoogleIcon from "@mui/icons-material/Google";
import { SwitcherContext } from "./LoginPage";
import Tooltip from "@mui/material/Tooltip";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  boxShadow: "none",
}));

function LoginForm() {
  const handerSwitch = useContext(SwitcherContext);
  const [emailValue, setEmail] = React.useState("");
  const [pwdValue, setPwd] = React.useState("");
  const validateEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const validatePwd = (event) => {
    const value = event.target.value;
    setPwd(value);
  };
  const handlerValidation = (event) => {
    event.preventDefault();
    if (emailValue === "123@gmail.com" && pwdValue === "123123") {
      console.log("correct");
    } else {
      console.log("fail");
    }
  };
  return (
    <BoxContainer
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          handlerValidation(event);
        }
      }}
    >
      <CssTextField
        id="outlined-email-input"
        label="Email"
        type="email"
        onChange={validateEmail}
      />
      <Marginer direction="vertical" margin="1vh" />
      <CssTextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={validatePwd}
      />

      <Marginer direction="vertical" margin="3vh" />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={10}>
          <Grid item xs={8}>
            <Item>
              <MuiStyle />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <BoldSpan href="#">Forget your password? </BoldSpan>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Marginer direction="vertical" margin="1vh" />
      <SubmitButton type="submit" onClick={handlerValidation}>
        Sign in
      </SubmitButton>
      <Marginer direction="vertical" margin="1vh" />
      <SmallSpan href="#">
        Don't have an accoun?{" "}
        <BoldSpan href="#" onClick={handerSwitch}>
          Signup
        </BoldSpan>
        <Marginer direction="vertical" margin="2vh" />
        <BreakLine />
        <Tooltip title="Login with Google">
          <SubmitButton type="submit">
            <GoogleIcon />
          </SubmitButton>
        </Tooltip>
        <Marginer direction="vertical" margin="2vh" />
      </SmallSpan>
    </BoxContainer>
  );
}

export default LoginForm;