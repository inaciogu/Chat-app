import {
  Box, Button, Container, TextField, Typography,
} from '@mui/material';
import { userContext } from 'contexts/userContext';
import { MouseEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Principal() {
  const { handleUsername, currentSocket: socket } = useContext(userContext);
  const navigate = useNavigate();

  const [room, setRoom] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const joinRoom = (event: MouseEvent) => {
    event.preventDefault();
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      handleUsername(username);
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
