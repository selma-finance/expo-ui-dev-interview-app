import * as React from 'react';

import Box from '../Box';

interface BottomDotsProps {
  numberOfItems: number;
  currentIndex: number;
}

const BottomDots: React.FC<BottomDotsProps> = ({ numberOfItems, currentIndex }) => {
  return (
    <Box testID="bottom-dots" style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {[...Array.from({ length: numberOfItems }).keys()].map(index => (
        <Box
          key={index}
          width={24}
          height={4}
          borderRadius="s"
          backgroundColor={currentIndex === index ? 'backgroundActive' : 'backgroundInactive'}
          marginLeft={index > 0 ? 'xs' : 'none'}
        />
      ))}
    </Box>
  );
};

export default BottomDots;
