import { Avatar, IconButton } from "@material-ui/core";
import Pusher from "pusher-js";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import { React, useState, useEffect, setState } from "react";
import "./style.css";
import Sidebar from "../Sidebar";
import axios from "../../axios";
import { getColor, getFirst } from "../SidebarChat";
import Timestamp from "react-timestamp";
import { useStoreContext } from "../../utils/GlobalStore";
import UserChat from "../UserChat";
import AdminChat from "../AdminChat";

function Chat() {
  //settign states
  const [messages, setMessages] = useState([]);

  //setting axios calls to get messages from db
  useEffect(async () => {
    const res = await axios.get("/messages");
    setMessages(res.data);
  }, []);

  // this is the realtime mongo hookup.
  useEffect(() => {
    const pusher = new Pusher("19b49e3760d87d26f1b4", {
      cluster: "us2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      setMessages([...messages, data]);
    });
    //clean up function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  const [{ name, token }, dispatch] = useStoreContext();
  if (name === "admin@admin.com") {
    return <AdminChat messages={messages} />;
  } else {
    return <UserChat messages={messages} />;
  }
}

// function Chat({ messages }) {
//   const [input, setInput] = useState("");
//   const [{ name, token }, dispatch] = useStoreContext();

//   const timeElapsed = Date.now();
//   const today = new Date(timeElapsed);
//   const ATM = today.toUTCString();

//   const sendMessage = async (e) => {
//     e.preventDefault();

//     await axios.post("/messages/new", {
//       message: input,
//       name: `${name}`,
//       timestamp: `${ATM}`,
//       received: false,
//       roomName: `${name}`,
//     });
//     setInput("");
//   };

//   function getCurrentChat() {
//     let thisChat = document.getElementById("currentChat").innerHTML;
//     return thisChat;
//   }
//   // getting first letter of email for avatar
//   function getFirst(name) {
//     const first = name.name.split("");
//     const firstLet = first[0];
//     return firstLet;
//   }
//   //
//   function getColor() {
//     const colors = ["blue", "red", "orange", "green", "purple", "pink"];
//     const randomColor = colors[Math.floor(Math.random() * colors.length)];
//     return randomColor;
//   }
//   if (name === "admin@admin.com") {
//     return (
//       <>
//         <Sidebar />
//         <div className="chat">
//           <div className="chatHeader">
//             <Avatar style={{ backgroundColor: getColor() }}>
//               {getFirst({ name })}
//             </Avatar>
//             <div className="chatHeaderInfo">
//               <h3 id="currentChat">{name}</h3>
//             </div>
//             <div className="chatHeaderRight">
//               <IconButton>
//                 <SearchOutlined />
//               </IconButton>
//               <IconButton>
//                 <AttachFile />
//               </IconButton>
//               <IconButton>
//                 <MoreVert />
//               </IconButton>
//             </div>
//           </div>

//           <div className="chatBody">
//             {messages.map((message) => {
//               if (message.roomName === getCurrentChat()) {
//                 return (
//                   <p
//                     className={`chatMessage ${
//                       message.received && "chatReceiver"
//                     }`}
//                   >
//                     <span className="chatName">{message.name}</span>
//                     {message.message}
//                     <span className="chatTimestamp">{message.timestamp}</span>
//                   </p>
//                 );
//               }
//             })}
//           </div>
//           <div className="chatFooter">
//             <InsertEmoticon />
//             <form>
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type a message"
//                 type="text"
//               />
//               <button onClick={sendMessage} type="submit">
//                 Send Message
//               </button>
//             </form>
//             <MicIcon />
//           </div>
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <div className="chat">
//           <div className="chatHeader">
//             <Avatar style={{ backgroundColor: getColor() }}>
//               {getFirst({ name })}
//             </Avatar>
//             <div className="chatHeaderInfo">
//               <h3>{name}</h3>
//             </div>
//             <div className="chatHeaderRight">
//               <IconButton>
//                 <SearchOutlined />
//               </IconButton>
//               <IconButton>
//                 <AttachFile />
//               </IconButton>
//               <IconButton>
//                 <MoreVert />
//               </IconButton>
//             </div>
//           </div>

//           <div className="chatBody">
//             {messages.map((message) => {
//               if (message.roomName === `${name}`) {
//                 return (
//                   <p
//                     className={`chatMessage ${
//                       message.received && "chatReceiver"
//                     }`}
//                   >
//                     <span className="chatName">{message.name}</span>
//                     {message.message}
//                     <span className="chatTimestamp">{message.timestamp}</span>
//                   </p>
//                 );
//               }
//             })}
//           </div>
//           <div className="chatFooter">
//             <InsertEmoticon />
//             <form>
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type a message"
//                 type="text"
//               />
//               <button onClick={sendMessage} type="submit">
//                 Send Message
//               </button>
//             </form>
//             <MicIcon />
//           </div>
//         </div>
//       </>
//     );
//   }
// }

export default Chat;
