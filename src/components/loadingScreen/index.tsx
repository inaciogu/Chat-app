import { styled } from '@mui/material';
import Lottie from 'react-lottie';
import * as loadingAnimation from './loading.json';

const RootStyle = styled('div')(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function LoadingScreen() {
  return (
    <RootStyle>
      <Lottie options={defaultOptions} width={200} height={200} />
    </RootStyle>
  );
}
