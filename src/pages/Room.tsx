import {
  Button, Container, TextField, Typography,
} from '@mui/material';
import {
  useContext, useEffect, useState,
} from 'react';
import Chat from 'components/Chat';
import { userContext } from 'contexts/userContext';
import { useParams } from 'react-router-dom';

export interface IMessage {
  id: number;
  room: string | undefined;
  author: string;
  time: string;
  message: string;
}

let messageId: number = 0;

export default function Room() {
  const { username, currentSocket: socket } = useContext(userContext);
  const { id } = useParams();

  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const sendMessage = async () => {
    messageId += 1;
    if (currentMessage !== '') {
      const messageData = {
        id: messageId,
        room: id,
        message: currentMessage,
        author: username,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      };
      await socket.emit('send_message', messageData);
      setMessages((previousMessages) => [...previousMessages, messageData]);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (data: IMessage) => {
        console.log(data);
        // setMessages((previousMessages) => [...previousMessages, data]);
      });
    }
  }, [socket]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2">
        {`Welcome to the room ${id}`}
      </Typography>
      <Chat username={username} messages={messages} />
      <TextField label="write your message" onChange={(event) => setCurrentMessage(event.target.value)} />
      <Button variant="contained" onClick={() => sendMessage()}>
        Send
      </Button>
    </Container>
  );
}
