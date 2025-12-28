import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const user = useSelector((store)=>store.user)
  const userid = user?._id
  const bottomRef = useRef(null);

  useEffect(()=>{
    const socket = createSocketConnection()

    socket.emit("joinChat",{userid,targetUserId})

    return ()=>{
      socket.disconnect();
    }
  },[])
  


  // Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSend = () => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      receiver: targetUserId,
      message: text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setText("");

    // 🔗 Later connect here:
    // socket.emit("send-message", newMessage)
    // and POST /api/messages
  };

  return (
    <div className="flex flex-col h-[75vh] w-[150vh] bg-gray-600 ">
      {/* Header */}
      <div className="p-4 shadow font-semibold">
        Chat with <span className="text-blue-600">{targetUserId}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
              msg.sender === "me"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-white border"
            }`}
          >
            {msg.message}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 flex gap-2 border-t">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2 outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
