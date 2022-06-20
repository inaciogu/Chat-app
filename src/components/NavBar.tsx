import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  AppBar, Box, IconButton, Stack,
  Toolbar, Typography,
} from '@mui/material';
import UserPopover from './UserPopover';

interface INavBar {
  id: string | undefined;
  onClick: () => void;
}

export default function NavBar({ id, onClick }: INavBar) {
  return (
    <AppBar position="relative">
      <Toolbar variant="dense" sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <IconButton onClick={onClick}>
          <MenuIcon />
        </IconButton>
        <Stack width="100%">
          <Typography alignSelf="center" variant="h4">
            {`# ${id}`}
          </Typography>
        </Stack>
        <Box display="flex" alignItems="center">
          <UserPopover />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
