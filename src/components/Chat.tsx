import { Box, Stack, Typography } from '@mui/material';
import { IMessage } from 'pages/Room';

interface IChat {
  username: string;
  messages: IMessage[];
}

export default function Chat({ messages, username }: IChat) {
  return (
    <Stack
      border="1px solid black"
      borderRadius={2}
      p={5}
    >
      {messages.map((item) => (
        <Box
          key={item.id}
          display="flex"
          alignItems="center"
          alignSelf={username === item.author ? 'flex-start' : 'flex-end'}
        >
          <Typography fontWeight="bold">{item.author}</Typography>
          :
          <Typography>{item.message}</Typography>
        </Box>
      ))}
    </Stack>
  );
}
