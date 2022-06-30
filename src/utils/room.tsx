import {
  Games,
  Help,
  MeetingRoom, Newspaper, Work,
} from '@mui/icons-material';

const getRoomIcons = (roomName: string) => {
  switch (roomName) {
    case 'Games':
      return <Games />;
    case 'Work':
      return <Work />;
    case 'Help':
      return <Help />;
    case 'Meeting':
      return <MeetingRoom />;
    case 'News':
      return <Newspaper />;
    default:
      return roomName;
  }
};

export default getRoomIcons;
