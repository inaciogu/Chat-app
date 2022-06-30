import {
  Typography, Avatar, Box, Stack,
} from '@mui/material';

interface IMessageItem {
  username: string | undefined;
  author: string | undefined;
  message: string;
  time: string;
}

export default function MessageItem({
  username, author, time, message,
}: IMessageItem) {
  return (
    <Box display="flex">
      <Avatar variant="rounded" src="/" alt={author} />
      <Stack width="100%" mx={1}>
        <Box display="flex" alignItems="center">
          <Typography alignSelf="flex-start" fontWeight="bold" mr={1}>{username === author ? 'Me' : author}</Typography>
          <Typography alignSelf="center" variant="caption">{time}</Typography>
        </Box>
        <Typography
          sx={{
            wordWrap: 'break-word',
            maxWidth: '90%',
            mb: 1,
          }}
        >
          {message}
        </Typography>
      </Stack>
    </Box>
  );
}
