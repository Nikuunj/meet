import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

const URL = import.meta.env.VITE_ENV;

function Chat() {
  const [socket, setSocket] = useState<null | Socket>(null);
  const [roomId, setRoomId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [create, setCreate] = useState<boolean>(false);
  const [join, setJoin] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ sender: string; message: string; timestamp: string }>>([]); 
  const [copy, setCopy] = useState<boolean>(false)

  // Handle socket connection
  useEffect(() => {
    const socket = io(URL);
    setSocket(socket);

    // Listen for incoming messages
    socket.on('message', ({ sender, message, timestamp }) => {
      // console.log(`[${timestamp}] Message from ${sender}: ${message}`);
      setMessages((prevMessages) => [...prevMessages, { sender, message, timestamp }]);
    });

    // Listen for the room creation offer (send-offer)
    socket.on('send-offer', ({ roomId }) => {
      // console.log(`Room created with ID: ${roomId}`);
      setRoomId(roomId);  // Set the roomId state to the newly created room ID
    });

    return () => {
      socket.disconnect(); // Clean up on unmount
    };
  }, []);

  // Handle create room logic
  useEffect(() => {
    if (create && socket && name) {
      // console.log('Creating room for', name);
      socket.emit('create-room', { name });
      // setCreate(false); // Reset create state
    }
  }, [create, socket, name]);

  // Handle join room logic
  useEffect(() => {
    if (join && socket && roomId && name) {
      // console.log('Joining room with ID:', roomId);
      socket.emit('join-room', { roomId, name });
      // setJoin(false); // Reset join state
    }
  }, [join, socket, roomId, name]);

  const handleSendMessage = () => {
    if (message.trim() && socket && roomId) {
      const timestamp = new Date().toISOString(); // Get current timestamp

      setMessages((prevMessages) => [...prevMessages, { sender : 'me', message, timestamp }]);
      socket.emit('message', { roomId, message, timestamp });
      setMessage(''); // Reset message input
    }
  };

  const handleCopyText = (text: string) => {
    setCopy(true)
    navigator.clipboard.writeText(text).then(() => {
      setTimeout(() => setCopy(false), 3000)
    });
  };

  return (
    <div>
      {/* Render input fields for name and room ID */}
      {!( join || create ) && (
        <div className='mt-4'>
          <div>
            <input
              type="text"
              value={name}
              className='w-[90%] me-5 bg-slate-300 ms-5 p-3 rounded-lg'
              placeholder="Enter your name"
              onChange={(e) => {
                setName(e.target.value);
                setJoin(false); // Reset join state when name changes
                setCreate(false); // Reset create state when name changes
              }}
            />
          </div>

          <div>
            <input
              type="text"
              value={roomId}
              className='w-[90%] mt-2 me-5 bg-slate-300 ms-5 p-3 rounded-lg'
              placeholder="Enter room ID"
              onChange={(e) => {
                setRoomId(e.target.value);
                setJoin(false); // Reset join state when room ID changes
                setCreate(false); // Reset create state when room ID changes
              }}
            />
          </div>

          <div className='flex justify-center items-center w-full mt-5'>
            <button className='bg-gray-500 rounded-md px-10 me-2 py-2'  onClick={() => setJoin(true)}>Join Room</button>
            <button className='bg-green-700 rounded-md px-10 py-2' onClick={() => setCreate(true)}>Create Room</button>
          </div>
        </div>
      )}

      {/* If roomId is set, display room details */}
      {(roomId && (create || join)) && (
        <div className='sticky top-0 w-full py-2 px-2 bg-slate-700'>
          {/* <div>User name: {name}</div> */}
          <div>Room ID: {roomId} 
            <button
            className="mt-1 text-sm ps-4 text-blue-500 hover:underline"
            onClick={() => handleCopyText(roomId)}
            >
             {copy ? ' Copied' : ' Copy'} 
          </button></div>
        </div>
      )}

      {/* display msg */}
      {(roomId && (create || join)) && (
      <>
      {/* Display messages */}
      <div>
        <div className='mx duration-500'>
          {messages.map((msg, index) => (
              <div
              key={index}
              className={`flex mb-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg shadow-md ${
                    msg.sender === 'me'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-black text-left'
                  }`}
                >
                  <strong>{msg.sender === 'me' ? 'You' : msg.sender}</strong>
                  <div className="text-sm">{msg.message}</div>
                  <div className="text-xs">{msg.timestamp}</div>
                </div>
            </div>
            
          ))}
        </div>
      </div>
      </>  
      ) }


           {/* Message input and send button */}
           {(roomId && (create || join)) && (
        <div className='w-full fixed bg-slate-800 pt-3 pb-5 bottom-0'>
          <input
            className='w-[90%] me-5 bg-slate-300 ms-5 p-3 rounded-lg' 
            type="text"
            value={message}
            placeholder="Type your message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className='bg-gray-600 h-[46px] px-7 rounded-lg' onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default Chat;
