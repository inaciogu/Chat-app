import { SvgIconComponent } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ReactNode } from 'react';

interface IRoomItem {
  room: string;
  icon: ReactNode;
}

export default function RoomItem({ room, icon }: IRoomItem) {
  return (
    <ListItemButton>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText>
        {room}
      </ListItemText>
    </ListItemButton>
  );
}
