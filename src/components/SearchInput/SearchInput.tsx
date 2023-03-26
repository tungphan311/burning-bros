import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

type SearchInputProps = {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function SearchInput({ handleInputChange }: SearchInputProps) {
  return (
    <InputGroup maxW={600}>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color='gray.300' />
      </InputLeftElement>

      <Input placeholder='Type to search' onChange={handleInputChange} />
    </InputGroup>
  )
}

export default SearchInput
