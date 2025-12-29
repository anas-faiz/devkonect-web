import { io } from "socket.io-client";

export const createSocketConnection = () => {
  return io("/", {
  path: "/api/socket.io",
  withCredentials: true,
});

};
