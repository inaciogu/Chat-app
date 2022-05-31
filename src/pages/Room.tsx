import {
  Box,
  Button, Container, Stack, TextareaAutosize, TextField, Typography,
} from '@mui/material';
import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useContext, useEffect, useState,
} from 'react';
import Chat from 'components/Chat';
import { userContext } from 'contexts/userContext';
import { useParams } from 'react-router-dom';
import { SendSharp } from '@mui/icons-material';

export interface IMessage {
  room: string | undefined;
  author: string;
  time: string;
  message: string;
}

export default function Room() {
  const { username, socket } = useContext(userContext);
  const { id } = useParams();

  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: id,
        message: currentMessage,
        author: username,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      };
      await socket.emit('send_message', messageData);
      setMessages((previousMessages) => [...previousMessages, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    const handleMessages = (data: IMessage) => {
      setMessages((oldMessages) => [...oldMessages, data]);
    };

    socket.on('receive_message', handleMessages);

    return () => {
      socket.off('receive_message', handleMessages);
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <Stack component="form" spacing={2}>
        <Typography variant="h3">
          {`Welcome to the room ${id}`}
        </Typography>
        <Chat username={username} messages={messages} />
        <TextField
          inputProps={{
            onKeyDown: (event) => {
              if (event.code === 'Enter') {
                event.preventDefault();
                sendMessage();
              }
            },
          }}
          label="type your message"
          multiline
          onChange={(event) => setCurrentMessage(event.target.value)}
          value={currentMessage}
          sx={{ maxWidth: 500 }}
        />
        <Box>
          <Button endIcon={<SendSharp />} variant="contained" onClick={() => sendMessage()}>
            Send
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}