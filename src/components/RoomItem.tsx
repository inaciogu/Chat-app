import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ReactNode } from 'react';

interface IRoomItem {
  room: string;
  changeRoom: (room: string) => void;
}

export default function RoomItem({ room, changeRoom }: IRoomItem) {
  return (
    <ListItemButton onClick={() => changeRoom(room)}>
      <ListItemText>
        {room}
      </ListItemText>
    </ListItemButton>
  );
}
