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
  Stack,
  Container,
} from '@mui/material';

import { format } from 'date-fns';

import {
  useContext, useEffect, useState,
} from 'react';
import Chat from 'components/Chat';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DarkMode,
  LightMode,
  SendSharp,
  Settings,
} from '@mui/icons-material';
import { ThemeContext } from 'contexts/ThemeContext';
import RoomItem from 'components/RoomItem';
import UserPopover from 'components/UserPopover';
import useAccount from 'hooks/useAccount';
import NavBar from 'components/NavBar';
import { GET_MESSAGES, NEW_MESSAGE } from 'services/messages.service';

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
  width: '100%',
  height: '100%',
}));

export default function Room() {
  const { username, socket, rooms } = useAccount();
  const { setThemeMode } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const sendMessage = async () => {
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
      const response = await NEW_MESSAGE({ ...messageData, date: '21-06-2022' });
      console.log(response);
    }
  };

  const changeRoom = (room: string) => {
    socket.emit('change_room', id, room);
    navigate(`/room/${room}`);
    setOpen(false);
    setMessages([]);
  };

  useEffect(() => {
    const getLatestMessages = async () => {
      try {
        const { data } = await GET_MESSAGES(id || '');
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getLatestMessages();
  }, []);

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
      <NavBar id={id} onClick={() => setOpen(true)} />
      <Stack height="100%" p={2}>
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
          label="Type something..."
          multiline
          onChange={(event) => setCurrentMessage(event.target.value)}
          value={currentMessage}
          sx={{ mt: 2 }}
        />
      </Stack>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2, width: 250 }}>
          <List>
            <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography fontWeight="bold">Rooms</Typography>
              <Box width="100%" display="flex" flexDirection="column">
                {rooms.map((room) => (
                  <RoomItem
                    key={room.id}
                    room={room.name}
                    icon={room.icon}
                    changeRoom={changeRoom}
                  />
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
