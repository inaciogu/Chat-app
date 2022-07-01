import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Alert,
  Box, Button, Stack, TextField, Typography,
} from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import useAccount from 'hooks/useAccount';
import { useState } from 'react';
import RoomSelection from 'components/RoomSelection';
import { RootStyle } from './Principal';
import registerBackground from '../assets/register_background.svg';

interface IRegisterInputs {
  name: string;
  username: string;
  email: string;
  password: string;
}

const schema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Registration() {
  const { registration } = useAccount();

  const [open, setOpen] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | undefined>();

  const {
    handleSubmit,
    formState: { errors }, control,
  } = useForm<IRegisterInputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IRegisterInputs> = async (data) => {
    try {
      await registration(data);
      setOpen(true);
    } catch (error: any) {
      console.log(error.response.data.message);
      setOpen(false);
      setAuthError(error.response.data.message);
    }
  };

  return (
    <RootStyle>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} width="100%" height="100%" spacing={4} justifyContent="center" alignItems="center" padding={4}>
        <Typography alignSelf="flex-start" variant="h4">Create an Account</Typography>
        <Typography alignSelf="flex-start" variant="caption">It is easy! Enter your credentials and talk to your friends in anywhere.</Typography>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} fullWidth label="Name" error={!!errors.name} helperText={errors.name?.message} />
          )}
        />
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} fullWidth label="username" error={!!errors.username} helperText={errors.username?.message} />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} fullWidth label="email" error={!!errors.email} helperText={errors.email?.message} />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField type="password" {...field} fullWidth label="password" error={!!errors.password} helperText={errors.password?.message} />
          )}
        />
        {authError && (
          <Alert severity="warning" sx={{ width: '100%' }}>{authError}</Alert>
        )}
        <Button variant="contained" type="submit" sx={{ width: '60%' }}>Register</Button>
      </Stack>
      <Box
        display={
          { xs: 'none', md: 'inherit' }
        }
        component="img"
        src={registerBackground}
        borderRadius={2}
        boxShadow={5}
        width="50%"
        height="100%"
      />
      <RoomSelection open={open} onClose={() => setOpen(false)} />
    </RootStyle>
  );
}
