import * as React from 'react';
import { Box, Card, Typography, Divider } from '@mui/material';
import FindReport from 'src/sections/overview/app-find-report';
import CreateReport from 'src/sections/overview/app-create-report';

export default function AppPage() {
  return (
    <Box className="page-container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: '20px', bgcolor: '#f5f5f5' }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 600, bgcolor: '#fff', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
        
        <Typography variant="h4" className="title" sx={{ marginBottom: '20px', textAlign: 'center' }}>
          Find a Report
        </Typography>
        <FindReport />
        
        <Divider sx={{ width: '100%', my: 2 }} />

        <Typography variant="h4" className="title" sx={{ marginBottom: '20px', textAlign: 'center' }}>
          Create a New Report
        </Typography>
        <CreateReport />
        
      </Card>
    </Box>
  );
}
