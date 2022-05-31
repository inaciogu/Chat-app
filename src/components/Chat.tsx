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
      p={3}
      maxWidth={500}
    >
      {messages.map((item, index) => (
        <Typography
          key={index}
          minWidth="10%"
          maxWidth="80%"
          mb={1}
          display="flex"
          flexDirection="column"
          overflow="hidden"
          flexWrap="wrap"
          alignSelf={username === item.author ? 'flex-start' : 'flex-end'}
          sx={{
            background: username === item.author ? 'green' : 'red', color: '#fff', p: 1, borderRadius: 2,
          }}
        >
          {item.message}
          <Typography variant="subtitle2" alignSelf="flex-end">{item.time}</Typography>
        </Typography>
      ))}
    </Stack>
  );
}
