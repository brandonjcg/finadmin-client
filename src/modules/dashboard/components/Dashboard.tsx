import { Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const sx = { width: '100%', height: '200px', fontSize: '1.5rem' };

// TODO: Create a DashboardItem
export const Dashboard = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button
            component={Link}
            to="/transaction"
            variant="contained"
            color="primary"
            sx={sx}
          >
            Transactions
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button
            component={Link}
            to="/banks"
            variant="contained"
            color="primary"
            sx={sx}
          >
            Banks
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button
            component={Link}
            to="/totals"
            variant="contained"
            color="primary"
            sx={sx}
          >
            Totals
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
