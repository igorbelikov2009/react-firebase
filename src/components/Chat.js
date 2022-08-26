import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "..";
import Loader from "./Loader";
import firebase from "firebase/compat/app";

//
// import "firebase/compat/firestore";

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth); // react-firebase-hooks/auth
  const [value, setValue] = useState("");

  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  ); // с помощью этого react-firebase-hooks firestore мы будем получать сообщения.
  // useCollectionData - Переменная, отвечает за то, что загрузились сообщения или нет. Параметром принимает запрос - firestore
  // orderBy('createdAt') -- сортировка по полю создания сообщения

  const sendMessage = async () => {
    console.log(value.trim().length); // если сообщение пустое, то метод не выполнится
    if (value.trim().length) {
      firestore.collection("messages").add({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), // получаем время через сервер firebase
      });

      setValue("");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50, marginTop: 20 }}
        justifyContent={"center"}
      >
        <div
          style={{
            width: "80%",
            height: "60vh",
            border: "1px solid gray",
            overflowY: "auto",
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                margin: 10,
                border:
                  user.uid === message.uid
                    ? "2px solid green"
                    : "2px dashed red",
                marginLeft: user.uid === message.uid ? "auto" : "10px",
                width: "fit-content",
                padding: 5,
              }}
            >
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName} </div>
              </Grid>
              <div>{message.text} </div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: "80%" }}
        >
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            maxRows={2}
            variant={"outlined"}
          />
          <Button onClick={sendMessage} variant={"outlined"}>
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
