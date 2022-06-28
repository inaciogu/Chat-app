import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar, Box, IconButton, Skeleton, Stack,
  Toolbar, Typography,
} from '@mui/material';
import UserPopover from './UserPopover';

interface INavBar {
  id: string | undefined;
  onClick: () => void;
  loading: boolean;
}

export default function NavBar({ id, onClick, loading }: INavBar) {
  return (
    <AppBar position="relative">
      <Toolbar variant="dense" sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <IconButton onClick={onClick}>
          <MenuIcon />
        </IconButton>
        <Stack width="100%">
          <Typography alignSelf="center" variant="h4">
            {loading ? (
              <Box display="flex" alignItems="center">
                #
                {' '}
                <Skeleton width={70} variant="text" sx={{ ml: 1 }} />
              </Box>
            ) : `# ${id}`}
          </Typography>
        </Stack>
        <Box display="flex" alignItems="center">
          <UserPopover />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
