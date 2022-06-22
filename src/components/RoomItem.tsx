import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { IRoom } from 'contexts/UserContext';
import { ReactNode } from 'react';

interface IRoomItem {
  room: IRoom;
  changeRoom: (room: string) => void;
}

export default function RoomItem({ room, changeRoom }: IRoomItem) {
  return (
    <ListItemButton onClick={() => changeRoom(room._id)}>
      <ListItemText>
        {room.name}
      </ListItemText>
    </ListItemButton>
  );
}
