import {
  Box,
  Card, Dialog, DialogTitle, IconButton, Stack, Typography,
} from '@mui/material';
import useAccount from 'hooks/useAccount';
import { useNavigate } from 'react-router-dom';
import getRoomIcons from 'utils/room';

interface IRoomSelection {
  open: boolean;
  onClose: () => void;
}

export default function RoomSelection({ open, onClose }: IRoomSelection) {
  const { rooms, socket } = useAccount();
  const navigate = useNavigate();

  const joinRoom = (room: string) => {
    socket.emit('join_room', room);
    navigate(`/room/${room}`);
    if (socket.disconnected) {
      socket.connect();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select a room to join</DialogTitle>
      <Card sx={{ py: 2 }}>
        <Stack alignItems="center">
          <Box display="flex" alignItems="center" justifyContent="space-evenly" flexWrap="wrap">
            {rooms.map((room) => (
              <Stack p={2} key={room._id}>
                <Typography>{room.name}</Typography>
                <IconButton onClick={() => joinRoom(room._id)}>
                  {getRoomIcons(room.name)}
                </IconButton>
              </Stack>
            ))}
          </Box>
        </Stack>
      </Card>
    </Dialog>
  );
}
