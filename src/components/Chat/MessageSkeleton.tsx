import {
  Avatar, Box, Skeleton, Stack, Typography,
} from '@mui/material';

export default function MessageSkeleton() {
  return (
    <Box display="flex">
      <Skeleton width={40} height={40} variant="rectangular" sx={{ borderRadius: 1 }} />
      <Stack mx={1} width="100%">
        <Box display="flex" alignItems="center">
          <Skeleton variant="text" width={40} height={15} sx={{ mr: 1 }} />
          <Skeleton variant="text" width={40} height={10} />
        </Box>
        <Stack mt={1}>
          <Box display="flex" alignItems="center">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} variant="text" width={100} height={15} sx={{ mr: 1 }} />
            ))}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
