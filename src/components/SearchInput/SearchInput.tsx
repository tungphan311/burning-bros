import { useEffect, useState } from 'react'
import { Product } from '../../types/product'
import axios from '../../utils/axios'

function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (query !== '') {
      const delayDebounceFn = setTimeout(() => {
        search()
      }, 1000)

      return () => clearTimeout(delayDebounceFn)
    }
  }, [query])

  const search = async () => {
    setIsSearching(true)
    try {
      const response = await axios.get(`/products/search?q=${query}`)
      setResults(response.data.products)
    } catch (error) {
      console.log(error)
    }
    setIsSearching(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <input type='text' onChange={handleInputChange} />
      {isSearching && <div>Loading...</div>}
      {results.map((result) => (
        <div key={result.id}>{result.brand}</div>
      ))}
    </div>
  )
}

export default SearchInput
