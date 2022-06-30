import React, { useContext } from "react";
import {
  BoldSpan,
  BoxContainer,
  SmallSpan,
  SubmitButton,
  Marginer,
  BreakLine,
} from "../../css/CommonStyle";
import { CssTextField } from "./CommonMuiStyle";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { SwitcherContext } from "./LoginPage";
import Tooltip from "@mui/material/Tooltip";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Dashboard from "../sellerDashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../controller/login/thunks";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  boxShadow: "none",
}));
function handleCallBackResponse(res) {
  console.log("JWT:" + res.credential);
  console.log(res);
  var userObj = jwt_decode(res.credential);
  console.log(userObj);
}
function LoginForm(prop) {
  const dispatch = useDispatch();
  // const [user, setUser] = useState({});
  useEffect(() => {
    // global google
    window.google.accounts.id.initialize({
      client_id:
        "1089072716137-04fc5dho1ovglbmmpoagr24t83pqrjic.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("googleSignIn"),
      {
        theme: "filled_blue",
        shape: "pill",
        size: "large",
      }
    );
  }, []);

  let navigate = useNavigate();
  const handerSwitch = useContext(SwitcherContext);
  const [emailValue, setEmail] = React.useState("");
  const [pwdValue, setPwd] = React.useState("");
  const [visible, setVisible] = React.useState(true);
  const [seller, setSeller] = React.useState(true);
  const [remember, setRemember] = React.useState(true);
  const handleVisible = () => setVisible(!visible);

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
    let account = {
      userEmail: emailValue,
      password: pwdValue,
      isRemember: remember,
      isSeller: seller,
    };
    // setUser(account);
    return dispatch(loginAsync(account)).then((result) => {
      let role = result.payload.user.name;
      let path;
      if (role === "seller") {
        path = "../sellerX/dashboard";
      } else {
        path = "/";
      }
      navigate(path);
    });
  };
  const handleOnClickSeller = (event) => {
    setSeller(event.target.checked);
  };
  const handleOnClickRemember = (event) => {
    setRemember(event.target.checked);
  };

  return (
    <BoxContainer
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          handlerValidation(event);
        }
      }}
    >
      <Box>
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
          type={visible ? "password" : "text"}
          autoComplete="current-password"
          onChange={validatePwd}
          InputProps={{
            endAdornment: (
              <IconButton aria-label="edit" onClick={handleVisible}>
                {visible && <VisibilityIcon />}
                {!visible && <VisibilityOffIcon />}
              </IconButton>
            ),
          }}
        />

        <Marginer direction="vertical" margin="3vh" />

        <Grid container spacing={1}>
          <Grid item xs={12} md={8} sm={12}>
            <Item>
              <FormGroup>
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox defaultChecked onClick={handleOnClickRemember} />
                  }
                  label="Remember Me"
                />
              </FormGroup>
            </Item>
          </Grid>

          <Grid item xs={12} md={4} sm={12}>
            <Item>
              <FormGroup>
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox defaultChecked onClick={handleOnClickSeller} />
                  }
                  label="Seller"
                />
              </FormGroup>
            </Item>
          </Grid>
        </Grid>
        <Marginer direction="vertical" margin="1vh" />
        <SubmitButton type="submit" onClick={handlerValidation}>
          Sign in
        </SubmitButton>
      </Box>

      <Marginer direction="vertical" margin="1vh" />
      <SmallSpan href="#">
        Don't have an accoun?
        <BoldSpan href="#" onClick={handerSwitch}>
          Signup
        </BoldSpan>
        <Marginer direction="vertical" margin="2vh" />
        <BreakLine />
        <div id="googleSignIn"></div>
        <Marginer direction="vertical" margin="2vh" />
      </SmallSpan>
      <HomeIcon onClick={() => navigate("../")} />
    </BoxContainer>
  );
}

export default LoginForm;
