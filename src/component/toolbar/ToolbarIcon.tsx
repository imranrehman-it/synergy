import React from 'react';
import { PhoneIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

export const ToolbarIcon = () => {
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      border="0.005rem solid" 
      borderColor="gray.300" 
      rounded="md" 
      p={2}
    >
      <PhoneIcon w={5} h={5} />
    </Box>
  );
}
