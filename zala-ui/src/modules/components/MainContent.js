import * as React from 'react';
import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import { contract } from '../../dataproviders/zalacontract';
import ConnectWallet from './ConnectWallet';

const cardData = [
  {
    img: 'https://picsum.photos/800/450?seed=Travel',
    kind: 'Travel',
    stakeAmount: '500$',
    name: 'Trip to Rome',
    description: '',
    startTs: '2021-09-01T00:00:00.000Z',
    endTs: '2021-09-30T23:59:59.999Z',
  },
];

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});


export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [cardData, setCardData] = React.useState([]);
  const [connectedWalletAddress, setConnectedWalletAddress] = React.useState(
    null,
  );

  
  useEffect(() => {
    async function getUserGoals(address, businessId) {
        let goals = []
        let goal_items = []
        try {
          goal_items = await contract.getUserGoals(address);
        } catch (e) {
            console.error(e);
            return;
        }
        goal_items.forEach((goal) => {
          goals.push({
            id: goal.ID.toString(),
            img: 'https://picsum.photos/800/450?seed='+goal.kind,
            kind: goal.kind,
            stakeAmount: (goal.stakeAmount/10**18).toString()+'eth',
            name: goal.name,
            description: '',
            startTs: new Date(goal.startDateTime.toNumber()* 1000).toString(),
            endTs: new Date(goal.endDateTime.toNumber()* 1000).toString(),
          });
        });
        setCardData(goals);
    }

    getUserGoals("0x44AC194359fA44eCe6Cb2E53E8c90547BCCb95a0");
  }, []);


  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Plan, Invest, Achieve
        </Typography>
        <Typography>What goal you want to achieve today?</Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <ConnectWallet
          connectedWalletAddress={connectedWalletAddress}
          setConnectedWalletAddress={setConnectedWalletAddress}/>
        <Search />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <ConnectWallet
            connectedWalletAddress={connectedWalletAddress}
            setConnectedWalletAddress={setConnectedWalletAddress}/>

          <Search />
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
        {
          cardData.map((card, index) => (
            <Grid key={index} size={{ xs: 12, md: 6 }}>
              <SyledCard
                variant="outlined"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
                sx={{ height: '100%' }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={card.img}
                  sx={{
                    height: { sm: 'auto', md: '50%' },
                    aspectRatio: { sm: '16 / 9', md: '' },
                  }}
                />
                <SyledCardContent style={{marginTop: "0px"}}>
                  <Typography variant="caption" component="div">
                    {card.kind}
                  </Typography>
                  <Typography variant="h3" component="div">
                    {card.name}
                  </Typography>
                  <Typography variant="h6" component="div">
                    {card.stakeAmount}
                  </Typography>
                  <StyledTypography variant="caption" color="text.secondary">
                    {card.startTs} - {card.endTs}
                  </StyledTypography>
                </SyledCardContent>
              </SyledCard>
            </Grid>
          ))
        }
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onBlur={handleBlur}
            tabIndex={0}
            sx={{ height: 'auto' }}
          >
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                To great beginnings and beyond...
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Create a new Goal
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
        </Grid>

      </Grid>
    </Box>
  );
}
