import {
  Box,
  Button, Container, InputAdornment, Stack, styled, TextField, Typography,
} from '@mui/material';

import { format } from 'date-fns';

import {
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

const CURRENT_DATE = new Date(Date.now());

const RoomStyle = styled('section')(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'space-between',
  padding: 5,
}));

export default function Room() {
  const { username, socket } = useContext(userContext);
  const { id } = useParams();

  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const messageData = {
        room: id,
        message: currentMessage,
        author: username,
        time: format(CURRENT_DATE, 'HH:mm'),
      };
      socket.emit('send_message', messageData);
      setMessages((previousMessages) => [...previousMessages, messageData]);
      setCurrentMessage(' ');
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
    <RoomStyle>
      <Typography alignSelf="center" variant="h4">
        {`Welcome to ${id}`}
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SendSharp color={currentMessage.trim() ? 'primary' : 'inherit'} onClick={() => sendMessage()} />
            </InputAdornment>),
        }}
        label="type your message"
        multiline
        onChange={(event) => setCurrentMessage(event.target.value)}
        value={currentMessage}
        sx={{ mt: 2 }}
      />
    </RoomStyle>
  );
}
