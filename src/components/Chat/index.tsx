import { Stack } from '@mui/material';
import { IMessage } from 'pages/Room';
import { useLayoutEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import MessageSkeleton from './MessageSkeleton';

interface IChat {
  username: string | undefined;
  messages: IMessage[];
  loading: boolean;
}

export default function Chat({ messages, username, loading }: IChat) {
  const chatBoxRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  useLayoutEffect(() => {
    const height = chatBoxRef.current?.scrollHeight;
    chatBoxRef.current.scrollTop = height;
  }, [messages]);

  return (
    <Stack
      ref={chatBoxRef}
      borderRadius="0 0 6px 6px"
      p={2}
      alignSelf="center"
      width="95%"
      height="100%"
      sx={{
        overflowY: 'auto',
      }}
    >

      {!loading ? messages.map((item, index) => (
        <MessageItem
          key={index}
          author={item.author}
          message={item.message}
          time={item.time}
          username={username}
        />
      )) : (
        Array.from({ length: 3 }).map((_, index) => (
          <MessageSkeleton key={index} />
        ))
      )}
    </Stack>
  );
}
