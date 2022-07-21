import React from "react";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";

import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { Avatar, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:8888");
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
function BuyerSearch(prop) {
  const [openSearchChat, setOpenSearchChat] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [chatTarget, setChatTarget] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const loading = openSearchChat && options.length === 0;

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...prop.data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);
  React.useEffect(() => {
    if (!openSearchChat) {
      setOptions([]);
    }
  }, [openSearchChat]);
  const handleDisplay = (option) => {
    return (
      "Name: " +
      option.firstName +
      " " +
      option.lastName +
      ", Company: " +
      option.company +
      ", Status: " +
      (option.onlineStatus === true ? "Online" : "Offline")
    );
  };
  const handleChatTarget = (data) => {
    if (room !== "") {
      socket.emit("join_room", data.email);
    }
  };
  const handleSent = () => {
    if (message !== "") {
      socket.emit("send_message", { user, message });
      let tempEle = {
        user: prop.self,
        message: message,
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      let tempEle = {
        user: data.userName,
        message: data.message,
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
    });
  }, [socket]);

  return (
    <Box>
      <Autocomplete
        onKeyDown={(event, value) => {
          if (event.key === "Enter") {
            // your handler code
            // console.log(chatTarget);
            // console.log(chatTarget);
            // console.log(event);
          }
        }}
        id="asynchronous-demo"
        sx={{ width: 400 }}
        onChange={(event, value) => {
          setChatTarget(value);
          handleChatTarget(value);
          if (value !== null) {
            handleClickOpen(value);
          }
        }}
        open={openSearchChat}
        onOpen={() => {
          setOpenSearchChat(true);
        }}
        onClose={() => {
          setOpenSearchChat(false);
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={handleDisplay}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search to Chat"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={30} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <Box>
        <Dialog
          fullScreen={fullScreen}
          maxWidth="sm"
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Chat With " + chatTarget.firstName + " " + chatTarget.lastName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <DialogContentText sx={{ position: "relative", left: "10vw" }}>
              {" "}
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <DialogContentText sx={{ position: "relative", left: "10vw" }}>
              {" "}
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            {/* 
            {messageReceived.map((i) => {
              return <DialogContentText>{i.message}</DialogContentText>;
            })} */}
          </DialogContent>
          <DialogActions>
            <Input fullWidth defaultValue="Enter Text here" />
            <Button
              autoFocus
              onClick={handleSent}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            >
              Send
            </Button>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default BuyerSearch;