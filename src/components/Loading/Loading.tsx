import { Center, Spinner } from '@chakra-ui/react'

function Loading() {
  return (
    <Center w='100%' h='100px'>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
    </Center>
  )
}

export default Loading
