import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ToggleColorMode from './components/ToggleColorMode';
import getApplicationTheme from './theme/getApplicationTheme';
import ConnectWallet from './components/ConnectWallet';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  flex: '0 0 auto',
  fontFamily: 'sans-serif',
}));

function TemplateFrame({
  showCustomTheme,
  toggleCustomTheme,
  mode,
  toggleColorMode,
  children,
  connectedWalletAddress,
  setConnectedWalletAddress,
}) {
  const handleChange = (event) => {
    toggleCustomTheme(event.target.value === 'custom');
  };
  const blogTheme = createTheme(getApplicationTheme(mode));

  return (
    <ThemeProvider theme={blogTheme}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <StyledAppBar>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              p: '8px 12px',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <ToggleColorMode
                data-screenshot="toggle-mode"
                mode={mode}
                toggleColorMode={toggleColorMode}
              />
            </Box>
            <FormControl>
            <ConnectWallet
              connectedWalletAddress={connectedWalletAddress}
              setConnectedWalletAddress={setConnectedWalletAddress}/>
            </FormControl>
          </Toolbar>
        </StyledAppBar>
        <Box sx={{ flex: '1 1', overflow: 'auto' }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  showCustomTheme: PropTypes.bool.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default TemplateFrame;
