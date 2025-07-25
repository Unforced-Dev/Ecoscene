import { Outlet } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@mui/material';

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #E8F5E9 100%)',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
            borderRadius: 3,
          }}
        >
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                mb: 1,
              }}
            >
              ECOSCENE
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Our currency is connection; our mission is mycelial
            </Typography>
          </Box>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
}