import React from 'react';

import Title from '../components/Title';
import imgDetail from '../assets/graphql.png';
import imgDetail2 from '../assets/scheme.png';
import { Grid, styled, Typography, Box } from '@mui/material';
import { BoxProps } from '@mui/material';
import { useTheme } from '@mui/material';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const CustomGridItem = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  });

  const CustomTypography = styled(Typography)({
    fontSize: '1.1rem',
    textAlign: 'start',
    lineHeight: '1.5',
    color: '#515151',
    marginTop: '1.5rem',
  });

  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

  return (
    <Grid
      container
      spacing={{ xs: 4, sm: 4, md: 0 }}
      sx={{
        py: 10,
        px: 2,
      }}
    >
      <CustomGridItem item xs={12} sm={8} md={6} component="section">
        <Box
          component="article"
          sx={{
            px: 4,
          }}
        >
          <Title text={t('welcome_title')} textAlign={'start'} />
          <CustomTypography>{t('welcome_message')}</CustomTypography>
        </Box>
      </CustomGridItem>

      <Grid item xs={12} sm={4} md={6}>
        <img
          src={imgDetail}
          alt=""
          style={{
            width: '60%',
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        md={6}
        sx={{
          order: { xs: 4, sm: 4, md: 3 },
        }}
      >
        <img
          src={imgDetail2}
          alt=""
          style={{
            width: '60%',
          }}
        />
      </Grid>

      <CustomGridItem
        item
        xs={12}
        sm={8}
        md={6}
        sx={{
          order: { xs: 3, sm: 3, md: 4 },
        }}
      >
        <Box
          component="article"
          sx={{
            px: 4,
          }}
        >
          <Title text={t('welcome_title_2')} textAlign={'start'} />
          <CustomTypography>{t('welcome_message_2')}</CustomTypography>
          {user && (
            <Button
              label={t('go_to_main_page_button')}
              onClick={() => {
                navigate('/');
              }}
            />
          )}
          {!user && (
            <Button
              label={t('login_button')}
              onClick={() => {
                navigate('/login');
              }}
            />
          )}
        </Box>
      </CustomGridItem>
    </Grid>
  );
};

export default WelcomePage;
