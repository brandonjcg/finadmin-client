import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      color="white"
      zIndex="modal"
    >
      <CircularProgress disableShrink />
      <Typography variant="h6" marginTop={2}>
        Cargando...
      </Typography>
    </Box>
  );
};
