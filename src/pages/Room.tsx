import {
  Box,
  Button, Container, Stack, TextField, Typography,
} from '@mui/material';

import { format } from 'date-fns';

import {
  useContext, useEffect, useState,
} from 'react';
import Chat from 'components/Chat';
import { userContext } from 'contexts/userContext';
import { useParams } from 'react-router-dom';
import { SendSharp } from '@mui/icons-material';
import { RootStyle } from './Principal';

export interface IMessage {
  room: string | undefined;
  author: string;
  time: string;
  message: string;
}

const CURRENT_DATE = new Date(Date.now());

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
        time: format(CURRENT_DATE, 'HH:mm'),
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
    <RootStyle>
      <Stack width="80%" height="80%" boxShadow={5} borderRadius={3} p={5} component="form" spacing={2}>
        <Typography alignSelf="center" variant="h4">
          {`Welcome to ${id}`}
        </Typography>
        <Chat username={username} messages={messages} />
        <Box display="flex" alignItems="center">
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
            fullWidth
            sx={{ mr: 1 }}
          />

          {
            /* <Button
            sx={{ py: 1.8 }}
            endIcon={<SendSharp />} variant="contained" onClick={() => sendMessage()}>
            Send
          </Button> */}
        </Box>
      </Stack>
    </RootStyle>
  );
}
