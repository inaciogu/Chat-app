import {
  Button, Container, TextField, Typography,
} from '@mui/material';
import { userContext } from 'contexts/userContext';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from './Principal';

export default function Room() {
  const { username } = useContext(userContext);
  const { id } = useParams();

  const [currentMessage, setCurrentMessage] = useState<string>('');

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: id,
        message: currentMessage,
        author: username,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      };
      await socket.emit('send_message', messageData);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2">
        {`Welcome to the room ${id}`}
      </Typography>
      <TextField label="write your message" onChange={(event) => setCurrentMessage(event.target.value)} />
      <Button variant="contained" onClick={() => sendMessage()}>
        Send
      </Button>
    </Container>
  );
}
