import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ReactNode } from 'react';

interface IRoomItem {
  room: string;
  icon: ReactNode;
  changeRoom: (room: string) => void;
}

export default function RoomItem({ room, icon, changeRoom }: IRoomItem) {
  return (
    <ListItemButton onClick={() => changeRoom(room)}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText>
        {room}
      </ListItemText>
    </ListItemButton>
  );
}
