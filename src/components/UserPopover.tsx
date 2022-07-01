import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar, Card, IconButton, List, ListItemButton, ListItemText, Popover,
  ListItemIcon,
} from '@mui/material';
import useAccount from 'hooks/useAccount';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserPopover() {
  const { user, socket, logout } = useAccount();
  const navigate = useNavigate();

  const anchorRef = useRef(null);
  const avatarRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  const [open, setOpen] = useState<boolean>(false);
  const [variant, setVariant] = useState<any>('circular');

  const disconnectUser = () => {
    logout();
    socket.disconnect();
    navigate('/', { replace: true });
  };

  useLayoutEffect(() => {
    avatarRef.current.onmouseenter = () => {
      setVariant('rounded');
    };

    avatarRef.current.onmouseleave = () => {
      setVariant('circular');
    };
  }, [avatarRef]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={() => setOpen(true)}
        sx={{ mr: 2 }}
      >
        <Avatar src="/" ref={avatarRef} variant={variant} alt={user?.username} sx={{ transition: 'ease-in 200ms' }} />
      </IconButton>
      <Popover anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} anchorEl={anchorRef?.current} open={open} onClose={() => setOpen(false)}>
        <Card>
          <List>
            <ListItemButton onClick={() => disconnectUser()}>
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
