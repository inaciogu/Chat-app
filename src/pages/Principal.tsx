import {
  MouseEvent,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box, Button, Card, MenuItem, Stack, styled, TextField, Typography,
} from '@mui/material';
import useAccount from 'hooks/useAccount';

import manInComputer from '../assets/manInComputer.jpg';

interface ILoginInputs {
  email: string;
  password: string;
}

export const RootStyle = styled('main')(() => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Principal() {
  const { handleUsername, socket, rooms } = useAccount();
  const navigate = useNavigate();
  const {
    handleSubmit, register,
    formState: { errors },
  } = useForm<ILoginInputs>({ resolver: yupResolver(schema) });

  const [room, setRoom] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const joinRoom = (event: MouseEvent) => {
    event.preventDefault();
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      handleUsername(username);
      navigate(`/room/${room}`);
      if (socket.disconnected) {
        socket.connect();
      }
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
      <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center" width="100%">
        <Typography textAlign="center" variant="h3">Welcome to the chatapp</Typography>
        <Card sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', p: 5, boxShadow: 5,
        }}
        >
          <Stack width="100%" height="100%" p={2} justifyContent="center" alignItems="center" component="form" spacing={5}>
            <Typography textAlign="center" variant="h4">
              Select a room to join
            </Typography>
            <TextField onChange={(event) => setUsername(event.target.value)} label="Enter your username" fullWidth />
            <TextField value={room} select onChange={(event) => setRoom(event.target.value)} label="Select a room" fullWidth>
              {rooms.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
            <Button onClick={(event) => joinRoom(event)} type="submit" variant="contained" sx={{ width: '50%' }}>
              join
            </Button>
          </Stack>
        </Card>
      </Box>
    </RootStyle>
  );
}
