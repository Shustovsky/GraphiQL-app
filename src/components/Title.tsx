import { Typography } from '@mui/material';
import React from 'react';

interface Props {
  text: string;
  textAlign: string;
}

const Title = ({ text, textAlign }: Props) => {
  return (
    <Typography
      variant="h4"
      component="h3"
      sx={{
        fontWeight: '700',
        textAlign: textAlign,
      }}
    >
      {text}
    </Typography>
  );
};

export default Title;
