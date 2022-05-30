import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Room() {
  const { id } = useParams();

  return (
    <Container maxWidth="lg">
      <Typography variant="h2">
        {`Welcome to the room ${id}`}
      </Typography>
    </Container>
  );
}
