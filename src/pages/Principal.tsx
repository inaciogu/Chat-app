import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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
  const {
    socket, rooms, login,
  } = useAccount();
  const navigate = useNavigate();

  const [room, setRoom] = useState<string>('');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginInputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
    try {
      await login(data);
      if (room !== '') {
        socket.emit('join_room', room);
        navigate(`/room/${room}`);
        if (socket.disconnected) {
          socket.connect();
        }
      }
    } catch (error: any) {
      console.log('Erro');
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
          <Stack component="form" onSubmit={handleSubmit(onSubmit)} width="100%" height="100%" p={2} justifyContent="center" alignItems="center" spacing={5}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="enter email"
                  fullWidth
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="enter password"
                  type="password"
                  fullWidth
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <TextField
              value={room}
              select
              onChange={(event) => setRoom(event.target.value)}
              label="Select a room"
              fullWidth
            >
              {rooms.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" type="submit">Login</Button>
          </Stack>
        </Card>
      </Box>
    </RootStyle>
  );
}
