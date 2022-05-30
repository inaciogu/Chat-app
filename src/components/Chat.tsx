import { Stack, Typography } from '@mui/material';

interface IChat {
  messages: string[];
}

export default function Chat({ messages }: IChat) {
  return (
    <Stack>
      {messages.map((message) => (
        <Typography>
          {message}
        </Typography>
      ))}
    </Stack>
  );
}
