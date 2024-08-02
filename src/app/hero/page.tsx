'use client'
import {useRouter} from 'next/navigation';
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from '@chakra-ui/react'
import Logo from '../../../public/logo.svg';



export default function CallToActionWithIllustration() {
    const router = useRouter();
  return (
    <>
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Meeting scheduling{' '}
          <Text as={'span'} color={'blue.400'}>
            made easy
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Never miss a meeting. Never be late for one too. Keep track of your meetings and
          receive smart reminders in appropriate times. Read your smart “Daily Agenda”
          every morning.
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            color={'white'}
            bg={'blue.400'}
            _hover={{ bg: 'blue.500' }}
            variant={'link'} 
            onClick={()=>router.push('/login')}
            >
            Sign up
          </Button>
          <Button rounded={'full'} px={6}>
            Sign in
          </Button>
        </Stack>
        <Flex className='items-center h-96 w-96 mt-12'>
          <Logo />
        </Flex>
      </Stack>
    </Container>
    </>
  )
}