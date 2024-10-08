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
          Markdown{' '}
          <Text as={'span'} color={'blue.400'}>
            made easy
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
        Effortlessly create and manage Markdown files with custom shortcuts and reusable components, all powered by real-time previews and seamless cloud integration.
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
          <Button onClick={()=>router.push('/login')} rounded={'full'} px={6}>
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