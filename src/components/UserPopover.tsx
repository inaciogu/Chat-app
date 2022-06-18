import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar, Card, IconButton, List, ListItemButton, ListItemText, Popover,
  ListItemIcon,
} from '@mui/material';
import useAccount from 'hooks/useAccount';
import { useRef, useState } from 'react';

export default function UserPopover() {
  const { username } = useAccount();
  const anchorRef = useRef<HTMLButtonElement>({} as HTMLButtonElement);

  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={() => setOpen(true)}
        sx={{ mr: 2 }}
      >
        <Avatar alt={username} />
      </IconButton>
      <Popover anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} anchorEl={anchorRef.current} open={open} onClose={() => setOpen(false)}>
        <Card>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </List>
        </Card>
      </Popover>
    </>
  );
}
