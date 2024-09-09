import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import MainContent from './components/MainContent';
import Latest from './components/Latest';
import Footer from './components/Footer';
import TemplateFrame from './TemplateFrame';

import getApplicationTheme from './theme/getApplicationTheme';
import { Typography } from '@mui/material';

export default function ApplicationContainer() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const [connectedWalletAddress, setConnectedWalletAddress] = React.useState(
    null,
  );

  const blogTheme = createTheme(getApplicationTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
      connectedWalletAddress={connectedWalletAddress}
      setConnectedWalletAddress={setConnectedWalletAddress}
    >
      <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        {/* <AppAppBar /> */}
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', my: 4, gap: 4 }}
        >
          <div>
            <Typography variant="h1" gutterBottom>
              Plan, Invest, Achieve
            </Typography>
            <Typography>What goal you want to achieve today?</Typography>
          </div>

          { connectedWalletAddress ? 
            <MainContent connectedWalletAddress={connectedWalletAddress}/>
            : <Typography variant='h4' align='center' marginTop="100px">Connect your Wallet to continue</Typography>
          }
          {/* <Latest /> */}
        </Container>
        {/* <Footer /> */}
      </ThemeProvider>
    </TemplateFrame>
  );
}
