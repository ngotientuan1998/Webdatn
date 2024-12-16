import React, { useState, useEffect } from 'react';
import './StyleChat.css';
import { io } from 'socket.io-client';

const AdminChat = () => {
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadMessages, setUnreadMessages] = useState({});
  const [newChat, setnewChat] = useState(false)
  const apiUrl = process.env.REACT_APP_API_URL;
  const user = localStorage.getItem('user');
  const resUser = JSON.parse(user);
  const token = resUser.AccessToken;
  
  // console.log(resUser);

  useEffect(() => {
    // Kết nối đến server Socket.IO
    const newSocket = io(apiUrl, {
      transports: ['websocket', 'polling'],
      auth: { token },
    });
    setSocket(newSocket);
    // lắng nghe sự kiện người dùng tạo cuộc hội thoại mới
    newSocket.on('new_chat_created',(data)=>{
      if(data){
        setnewChat(!newChat)
      }
    })

    // Lắng nghe tin nhắn mới
    newSocket.on('new_message', (msg) => {
      let chatId = ''
      let msgObj = {}
      if(typeof(msg)==="string"){
        msgObj = JSON.parse(msg)
        chatId = msgObj.chatId
      }
      else{
        chatId = msg.chatId
        msgObj = msg
      }
      
      

      // Nếu không phải cuộc trò chuyện đang chọn, tăng số lượng chưa đọc
      if (chatId !== selectedChat) {
        setUnreadMessages((prev) => ({
          ...prev,
          [chatId]: (prev[chatId] || 0) + 1,
        }));
      } else {
        // Nếu là cuộc trò chuyện đang chọn, thêm tin nhắn vào danh sách
        setMessages((prevMessages) => [...prevMessages, msgObj]);
      }
    });

    return () => newSocket.disconnect();
  }, [apiUrl, token, selectedChat]);
  useEffect(() => {
    const messagesContainer = document.querySelector('.messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  // Lấy danh sách các cuộc hội thoại
  useEffect(() => {
    fetch(`${apiUrl}/chat/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setConversations(data.data);
        }
      })
      .catch((error) => console.error('Error fetching chats:', error));
  }, [apiUrl, token, unreadMessages,newChat]);

  const handleSelectChat = async (chatId) => {
    setSelectedChat(chatId);

    // Đặt lại số tin nhắn chưa đọc
    setUnreadMessages((prev) => ({
      ...prev,
      [chatId]: 0,
    }));

    // Tham gia phòng chat qua Socket.IO
    if (socket) {
      socket.emit('joinChat', chatId);
    }

    // Lấy tin nhắn của cuộc trò chuyện
    try {
      const res = await fetch(`${apiUrl}/chat/messages/${chatId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMessages(data.data || []);
    } catch (error) {
      console.log('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await fetch(`${apiUrl}/chat/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chatId: selectedChat,
          content: newMessage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Phát sự kiện qua Socket.IO
        if (socket) {
          // console.log("gửi:",typeof(data.data));
          
          socket.emit(`new_message`, JSON.stringify(data.data));
        }
        setNewMessage('');
      } else {
        console.log('Error sending message:', data.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="admin-chat">
      <div className="chat-sidebar">
        <h3>Danh sách chat</h3>
        <ul>
          {conversations.map((chat) => (
            <li
              key={chat._id}
              onClick={() => handleSelectChat(chat._id)}
              className={selectedChat === chat._id ? 'active' : ''}
            >
              <p>{chat.participants
                .filter((p) => p.Role === 'Khách hàng')
                .map((p) => p.HoTen)
                .join(', ')}</p>
              <p>{chat.lastMessage}</p>

              {/* Hiển thị dấu chấm đỏ nếu có tin nhắn chưa đọc */}
              {unreadMessages[chat._id] > 0 && (
                <span className="unread-indicator">
                  {unreadMessages[chat._id]}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-main">
        {selectedChat ? (
          <div className="chat-details">
            <h3>Tin nhắn</h3>
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.senderId?._id === resUser._id ? 'admin-message' : 'customer-message'}`}
                >
                  <span>
                    <b>{msg.senderId?.HoTen || 'Unknown'}:</b> {msg.content}
                  </span>
                  <span className="timestamp">{new Date(msg.timestamp).toLocaleString()}</span>
                </div>
              ))}
              {/* Chat Input */}
              <div className="chat-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-placeholder">
            <h3>Vui lòng chọn cuộc hội thoại</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
