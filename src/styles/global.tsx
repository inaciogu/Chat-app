import React from 'react';
import { GlobalStyles as GeneralStyles, useTheme } from '@mui/material';

export default function GlobalStyles() {
  const { palette } = useTheme();

  return (
    <GeneralStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          '::-webkit-scrollbar': {
            width: 8,
            height: 12,
          },
          '::-webkit-scrollbar-track': {
            background: 'grey',
            borderRadius: 6,
          },
          '::-webkit-scrollbar-thumb': {
            background: palette.grey[800],
            borderRadius: 6,
          },
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
      }}
    />
  );
}
