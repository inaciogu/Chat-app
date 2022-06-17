import {
  InputAdornment,
  Drawer,
  styled,
  TextField,
  Typography,
  List,
  ListItem,
  IconButton,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import { format } from 'date-fns';

import {
  useContext, useEffect, useState,
} from 'react';
import Chat from 'components/Chat';
import { userContext } from 'contexts/UserContext';
import { useParams } from 'react-router-dom';
import {
  DarkMode,
  Gamepad,
  LightMode,
  SendSharp,
  Settings,
} from '@mui/icons-material';
import { ThemeContext } from 'contexts/ThemeContext';
import RoomItem from 'components/RoomItem';

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
  const { username, socket, rooms } = useContext(userContext);
  const { setThemeMode } = useContext(ThemeContext);
  const { id } = useParams();

  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [open, setOpen] = useState<boolean>(false);

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
      <Box>
        <Box display="flex" alignItems="center" justifySelf="center" justifyContent="space-between">
          <Typography alignSelf="center" variant="h4">
            {`Welcome to ${id}`}
          </Typography>
          <IconButton onClick={() => setOpen(true)}>
            <Settings />
          </IconButton>
        </Box>
      </Box>
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
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2, width: 250 }}>
          <List>
            <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography fontWeight="bold">Rooms</Typography>
              <Box width="100%" display="flex" flexDirection="column">
                {rooms.map((room) => (
                  <RoomItem key={room.id} room={room.name} icon={room.icon} />
                ))}
              </Box>
            </ListItem>
            <Divider />
            <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography fontWeight="bold">Theme</Typography>
              <Box width="100%" display="flex" alignItems="center" justifyContent="space-around">
                <IconButton onClick={() => setThemeMode('dark')}>
                  <DarkMode />
                </IconButton>
                <Divider flexItem orientation="vertical" />
                <IconButton onClick={() => setThemeMode('light')}>
                  <LightMode />
                </IconButton>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </RoomStyle>
  );
}
