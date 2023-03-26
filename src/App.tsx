import { Center, Container, useToast, Wrap, WrapItem } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import './App.css'
import Loading from './components/Loading/Loading'
import ProductComponent from './components/Product/Product'
import SearchInput from './components/SearchInput/SearchInput'
import { Pagination } from './types/pagination'
import { Product } from './types/product'
import axios from './utils/axios'

const LIMIT = 20

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    total: 0,
    limit: LIMIT,
  })
  const toast = useToast()

  const { page, limit, total } = pagination
  const skip = (page - 1) * limit

  useEffect(() => {
    if (query !== '') {
      const delayDebounceFn = setTimeout(() => {
        search()
      }, 1000)

      return () => clearTimeout(delayDebounceFn)
    }
  }, [query])

  useEffect(() => {
    if (query !== '' && page * limit < total) {
      search(true)
    }
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight === scrollHeight) {
      setPagination((prePagination) => ({ ...prePagination, page: prePagination.page + 1 }))
    }
  }

  const search = async (isLoadMore = false) => {
    setIsSearching(true)
    try {
      const response = await axios.get(`/products/search?q=${query}&limit=${limit}&skip=${skip}`)
      if (isLoadMore) {
        setResults((preResult) => [...preResult, ...response.data.products])
      } else {
        setResults(response.data.products)
        setPagination({ page: 1, limit: LIMIT, total: response.data.total })
      }
    } catch (error: any) {
      toast({
        title: error.message || 'Search products failed!',
        status: 'error',
        isClosable: true,
      })
    }
    setIsSearching(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <Container maxW='container.xl' p='100px 0'>
      <Center>
        <SearchInput handleInputChange={handleInputChange} />
      </Center>

      <Wrap spacing='20px' marginTop={30}>
        {results.map(({ thumbnail, id, title, description, price, discountPercentage }) => (
          <WrapItem key={id}>
            <ProductComponent
              src={thumbnail}
              title={title}
              description={description}
              price={price}
              discount={discountPercentage}
            />
          </WrapItem>
        ))}
        {isSearching && <Loading />}
      </Wrap>
    </Container>
  )
}

export default App
