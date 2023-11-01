import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

export const metadata = {
  title: 'NFT Collection Generator',
  description: 'A generator to create entire collection of NFTs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'background.paper', justifyContent: 'center' }}>
              <Typography variant="h6" color="text.primary">
                {metadata.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Box component="main" sx={{mt: ['48px', '56px', '64px'],}}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
