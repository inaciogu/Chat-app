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
  useTheme,
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
} from '@mui/icons-material';
import { ThemeContext } from 'contexts/ThemeContext';
import RoomItem from 'components/RoomItem';
import useAccount from 'hooks/useAccount';
import NavBar from 'components/NavBar';
import { GET_ONE_ROOM } from 'services/rooms.service';
import { IRoom } from 'contexts/UserContext';
import { GET_MESSAGES, NEW_MESSAGE } from 'services/messages.service';

export interface IMessage {
  room: string | undefined;
  author: string | undefined;
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
  const { user, socket, rooms } = useAccount();
  const { setThemeMode } = useContext(ThemeContext);
  const { palette } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [currentRoom, setCurrentRoom] = useState<IRoom>({} as IRoom);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const sendMessage = async () => {
    if (currentMessage.trim()) {
      const messageData = {
        room: id || '',
        message: currentMessage,
        author: user?.username,
        time: format(CURRENT_DATE, 'HH:mm'),
      };
      socket.emit('send_message', messageData);
      await NEW_MESSAGE({
        ...messageData,
        date: format(CURRENT_DATE, 'dd/MM/yyyy'),
      });
      setMessages((previousMessages) => [...previousMessages, messageData]);
      setCurrentMessage(' ');
    }
  };

  const changeRoom = (room: string) => {
    socket.emit('change_room', id, room);
    navigate(`/room/${room}`);
    setOpen(false);
    setMessages([]);
  };

  useEffect(() => {
    const getCurrentRoom = async () => {
      setLoading(true);
      try {
        const { data } = await GET_ONE_ROOM(id);
        setCurrentRoom(data);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getCurrentRoom();
  }, [id]);

  useEffect(() => {
    const getLatestMessages = async () => {
      setLoading(true);
      try {
        const { data } = await GET_MESSAGES(id || '');
        setMessages(data);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getLatestMessages();
  }, [id]);

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
      <NavBar loading={loading} id={currentRoom.name} onClick={() => setOpen(true)} />
      <Stack height="91%">
        <Chat username={user?.username} loading={loading} messages={messages} />
        <Box display="flex" alignSelf="center" width="95%" p={2} borderRadius={2} boxShadow={2} sx={{ background: palette.mode === 'light' ? palette.grey[400] : palette.grey[900] }}>
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
            fullWidth
            onChange={(event) => setCurrentMessage(event.target.value)}
            value={currentMessage}
          />
        </Box>
      </Stack>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2, width: 250 }}>
          <List>
            <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography fontWeight="bold">Rooms</Typography>
              <Box width="100%" display="flex" flexDirection="column">
                {rooms.map((room) => (
                  <RoomItem
                    key={room._id}
                    room={room}
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
