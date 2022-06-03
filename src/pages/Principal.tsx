import {
  Box, Button, Container, MenuItem, Stack, styled, TextField, Typography,
} from '@mui/material';
import { userContext } from 'contexts/userContext';
import {
  MouseEvent, useContext, useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import manInComputer from '../assets/manInComputer.jpg';

const RootStyle = styled('main')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
}));

export default function Principal() {
  const { handleUsername, socket } = useContext(userContext);
  const navigate = useNavigate();

  const [room, setRoom] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const ROOMS = [
    {
      id: 1,
      name: 'Games',
    },
    {
      id: 2,
      name: 'Work',
    },
    {
      id: 3,
      name: 'Help',
    },
    {
      id: 4,
      name: 'Meeting',
    },
  ];

  const joinRoom = (event: MouseEvent) => {
    event.preventDefault();
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      handleUsername(username);
      navigate(`/room/${room}`);
    }
  };

  return (
    <RootStyle>
      <Box
        display={
          { xs: 'none', md: 'inherit' }
        }
        component="img"
        src={manInComputer}
        width="50%"
        height="100%"
      />
      <Stack component="form" p={12} spacing={2}>
        <Typography variant="h3">
          Select a room to join
        </Typography>
        <TextField onChange={(event) => setUsername(event.target.value)} label="Enter your username" />
        <TextField select onChange={(event) => setRoom(event.target.value)} label="Select a room">
          {ROOMS.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={(event) => joinRoom(event)} type="submit" variant="contained">
          join
        </Button>
      </Stack>
    </RootStyle>
  );
}
