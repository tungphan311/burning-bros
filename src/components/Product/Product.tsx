import { Box, Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { formatPrice } from '../../utils/formatNumber'

type ProductProps = {
  src: string
  title: string
  description: string
  price: number
  discount: number
}

function ProductComponent({ src, title, description, price, discount }: ProductProps) {
  return (
    <Card maxW='sm' height='100%'>
      <Box position='relative'>
        <Image
          src={src}
          height={228}
          borderTopLeftRadius='0.375rem'
          borderTopRightRadius='0.375rem'
          width='100%'
        />

        <Box position='absolute' top={0} right={0}>
          <Box
            backgroundColor='rgba(255,212,36,0.9)'
            padding={1}
            width='36px'
            _after={{
              content: '""',
              width: 0,
              height: 0,
              left: 0,
              right: 0,
              bottom: '-4px',
              position: 'absolute',
              borderColor: 'transparent rgba(255,212,36,.9)',
              borderStyle: 'solid',
              borderWidth: '0 18px 4px',
            }}
            fontSize='0.75rem'
            display='flex'
            textTransform='uppercase'
            flexDirection='column'
            textAlign='center'
          >
            <Text color='white'>Sale</Text>
            <Text color='#ee4d2d'>{Math.round(discount)}%</Text>
          </Box>
        </Box>
      </Box>
      <CardBody>
        <Stack spacing={3}>
          <Heading size='md'>{title}</Heading>
          <Text noOfLines={3}>{description}</Text>
          <Text color='blue.600' fontSize='2xl'>
            {formatPrice(price)}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default ProductComponent
