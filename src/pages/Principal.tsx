import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import * as yup from 'yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Alert,
  Box, Button, Card, Link, MenuItem, Stack, styled, TextField, Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAccount from 'hooks/useAccount';

import RoomSelection from 'components/RoomSelection';
import useToast from 'hooks/useToast';
import manInComputer from '../assets/manInComputer.jpg';
import chatBackground from '../assets/chat_background.svg';

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
  password: yup.string().min(5).required(),
});

export default function Principal() {
  const { login, isAuthenticated } = useAccount();
  const { enqueueToast } = useToast();

  const [authError, setAuthError] = useState<string | undefined>();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ILoginInputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
    try {
      await login(data);
      enqueueToast('Login Successfully', 'success');
    } catch (error: any) {
      console.log(error.response.data.message);
      setAuthError(error.response.data.message);
    }
  };

  return (
    <RootStyle>
      <Stack width="100%" alignItems="center" spacing={5}>
        <Typography textAlign="center" variant="h3">Welcome to the chatapp</Typography>
        <Typography variant="subtitle2">A web app where you can chat with anyone anywhere!</Typography>
        <Card sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', p: 3, boxShadow: 5,
        }}
        >
          <Stack component="form" onSubmit={handleSubmit(onSubmit)} width="100%" height="100%" p={2} justifyContent="center" alignItems="center" spacing={5}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Email"
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
                  label="Password"
                  type="password"
                  fullWidth
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            {authError && <Alert sx={{ width: '100%' }} severity="warning">{authError}</Alert>}
            <LoadingButton loading={isSubmitting} variant="contained" type="submit" sx={{ width: '60%' }}>Login</LoadingButton>
            <Box display="flex" alignItems="center">
              <Typography mr={1}>Not registred yet?</Typography>
              <Link component={RouterLink} to="/registration" underline="none" fontWeight="bold">Create an account</Link>
            </Box>
          </Stack>
        </Card>
      </Stack>
      <Box
        display={
          { xs: 'none', md: 'inherit' }
        }
        component="img"
        src={chatBackground}
        borderRadius={2}
        boxShadow={5}
        width="50%"
        height="100%"
      />
      <RoomSelection open={isAuthenticated} />
    </RootStyle>
  );
}
