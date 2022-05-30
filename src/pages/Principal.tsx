import {
  Box, Button, Container, TextField, Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

export default function Principal() {
  const navigate = useNavigate();

  const [room, setRoom] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const joinRoom = (event: MouseEvent) => {
    event.preventDefault();
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      navigate(`/room/${room}`);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h1">
        Select a room to join
      </Typography>
      <Box component="form">
        <TextField onChange={(event) => setUsername(event.target.value)} label="Enter your username" />
        <TextField onChange={(event) => setRoom(event.target.value)} label="Select a room" />
        <Button onClick={(event) => joinRoom(event)} type="submit" variant="contained">
          join
        </Button>
      </Box>
    </Container>
  );
}
