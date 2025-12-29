import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  // 🔌 Socket connection
  useEffect(() => {
  if (!userId || !targetUserId) return;

  socketRef.current = createSocketConnection();

  socketRef.current.emit("joinChat", { userId, targetUserId });

  const handleMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  socketRef.current.on("messageReceived", handleMessage);

  return () => {
    socketRef.current.off("messageReceived", handleMessage);
    socketRef.current.disconnect();
  };
}, [userId, targetUserId]);

  // ⬇ Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✉ Send message
  const handleSend = () => {
  if (!text.trim() || !socketRef.current) return;

  socketRef.current.emit("sendMessage", {
    sender: userId,
    receiver: targetUserId,
    message: text,
    createdAt: new Date().toISOString(),
  });

  setText("");
};

  return (
    <div className="flex flex-col h-[75vh] w-[150vh] bg-gray-600">
      {/* Header */}
      <div className="p-4 shadow font-semibold">
        Chat with <span className="text-blue-400">{targetUserId}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
              msg.sender === userId
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-white text-black"
            }`}
          >
            {msg.message}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 flex gap-2 border-t bg-gray-700">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2 outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
