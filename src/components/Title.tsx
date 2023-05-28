import { Typography } from '@mui/material';
import React from 'react';

interface IProps {
  text: string;
  textAlign: string;
}

const Title = ({ text, textAlign }: IProps) => {
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
