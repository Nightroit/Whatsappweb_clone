import { io } from "socket.io-client";

const URL = "http://localhost:3090";
const socket = io(URL);
export default socket;