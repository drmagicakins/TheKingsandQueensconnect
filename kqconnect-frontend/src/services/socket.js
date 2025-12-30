// src/services/socket.js
import { io } from "socket.io-client";

export const socket = io("https://api.kqconnect.com", {
  auth: {
    token: localStorage.getItem("token"),
  },
});
