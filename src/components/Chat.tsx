import { Box, Stack, Typography } from '@mui/material';
import { IMessage } from 'pages/Room';
import { useLayoutEffect, useRef } from 'react';
import MessageItem from './MessageItem';

interface IChat {
  username: string;
  messages: IMessage[];
}

export default function Chat({ messages, username }: IChat) {
  const chatBoxRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  useLayoutEffect(() => {
    const height = chatBoxRef.current?.scrollHeight;
    chatBoxRef.current.scrollTop = height;
  }, [messages]);

  return (
    <Stack
      border="1px solid grey"
      boxShadow={5}
      ref={chatBoxRef}
      borderRadius={2}
      p={3}
      width="100%"
      height="100%"
      sx={{
        overflowY: 'auto',
      }}
    >
      {messages.map((item, index) => (
        <MessageItem
          key={index}
          author={item.author}
          message={item.message}
          time={item.time}
          username={username}
        />
      ))}
    </Stack>
  );
}
