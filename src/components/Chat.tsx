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
      maxWidth={500}
    >
      {messages.map((item, index) => (
        <Box alignSelf={username === item.author ? 'flex-start' : 'flex-end'}>
          <Box
            key={index}
            display="flex"
            p={1}
            borderRadius={2}
            maxWidth={125}
            mb={1}
            alignItems="center"
            sx={{ background: username === item.author ? 'green' : 'red', color: '#fff' }}
          >
            <Typography>{item.message}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="caption" fontWeight="bold">{`${item.author} ${item.time}`}</Typography>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
