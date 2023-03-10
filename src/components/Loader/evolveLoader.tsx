import styled, { keyframes } from 'styled-components';
import { PotionLoaderMp4, PotionLoaderWebm } from 'src/config/image';

interface MintLoaderProps {
  value: number;
  setValue: (value: number) => void;
}

export const EvolveLoader = (props: MintLoaderProps) => {
  const { value, setValue } = props;
  // window.onbeforeunload = (event) => {
  //     const e = event || window.event;
  //     // Cancel the event
  //     e.preventDefault();
  //     if (e) {
  //         e.returnValue = ''; // Legacy method for cross browser support
  //         setMintStatus(0);
  //     }
  //     return ''; // Legacy method for cross browser support
  // };
  let randomLabel = '';
  let statusLabel = '';
  switch (value) {
    case 1:
      randomLabel = 'Evolving';
      statusLabel = 'Confirm your Metamask transaction in order to start evolve your NFT';
      break;
    case 2:
      randomLabel = 'Evolving your NFT';
      statusLabel = 'It will take around 20 seconds';
      break;
    case 3:
      randomLabel = 'Your NFT is now ready!';
      statusLabel = 'Confirm your Metamask transaction to start the minting process.';
      break;
    case 4:
      randomLabel = 'Minting in progress';
      statusLabel = 'It will take around 20 seconds';
      break;
    case 5:
      randomLabel = 'Congratulations!';
      statusLabel = 'Your mint was successful';
      break;
    default:
      break;
  }
  return (
    <MintLoaderContainer value={value}>
      <MintLoaderWrapper>
        <StepLabel>step {value} / 5</StepLabel>
        <RandomLabel>{randomLabel}</RandomLabel>
        <LoaderGif playsInline loop autoPlay muted id="my-video-desktop">
          <source src={PotionLoaderMp4} type='video/mp4; codecs="hvc1"' id="background-video-source-desktop" />
          <source src={PotionLoaderWebm} type="video/webm"></source>
          Your browser does not support the video tag.
        </LoaderGif>
        {(value === 2 || value === 4) && <HangonLabel>Hang on a moment</HangonLabel>}
        <StatusLabel>{statusLabel}</StatusLabel>
        {value === 5 && <CloseButton onClick={() => setValue(0)}>Close</CloseButton>}
      </MintLoaderWrapper>
    </MintLoaderContainer>
  );
};

const ModalStyle = styled.div`
  z-index: 9999999999999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #0f0f0f;
  transition: all linear 0.6s;
`;

interface MintLoaderContainerProps {
  value: number;
  children: React.ReactNode;
}

const MintLoaderContainer = ({ value, children }: MintLoaderContainerProps) => {
  return (
    <ModalStyle style={{ visibility: value === 0 ? 'hidden' : 'visible', opacity: value === 0 ? 0 : 0.95 }}>
      {children}
    </ModalStyle>
  );
};

const MintLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const StepLabel = styled.div`
  font-size: 14px;
  color: #ffffff;
`;

const RandomLabel = styled.div`
  font-size: 30px;
  font-family: 'gotham-bold';
  color: #f48e37;
  padding-top: 11px;
  @media screen and (max-width: 540px) {
    font-size: 24px;
  }
`;

const LoaderGif = styled.video`
  width: 260px;
  height: 200px;
  padding-top: 37.5px;
`;

const StatusLabel = styled.div`
  font-size: 16px;
  padding: 12px;
  width: 390px;
  text-align: center;
  @media screen and (max-width: 540px) {
    width: 280px;
    font-size: 14px;
  }
`;

const CloseButton = styled.div`
  margin-top: 30px;
  background: #f48e37 0% 0% no-repeat padding-box;
  height: 40px;
  border: none;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 14px;
  font-family: 'gotham-bold';
  color: #ffffff;
  cursor: pointer;
  user-select: none;
`;

function blinkingEffect() {
  return keyframes`
    50% {
      opacity: 0;
    }
  `;
}

const HangonLabel = styled.div`
  font-size: 16px;
  font-family: 'gotham-bold';
  color: #f48e37;
  padding-top: 24px;
  animation: 1s linear 0s infinite normal none running ${blinkingEffect};
`;
