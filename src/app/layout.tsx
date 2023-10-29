import * as React from 'react';
import Box from '@mui/material/Box';
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
          <Box component="main">
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
