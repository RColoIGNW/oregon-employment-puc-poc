import React, { FunctionComponent, useState, useCallback } from 'react'
import { FormControl, Input, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import {debounce} from 'lodash'

interface SearchProps {
  onSearch: (text: string) => void
  delay?: number
}

const DEFAULT_DELAY = 1000

const Search: FunctionComponent<SearchProps> = (props: SearchProps) => {
  const [searchText, setSearchText] = useState('')
  const delay = props.delay || DEFAULT_DELAY

  console.log(delay)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
    const text = event.target.value.toLowerCase().trim()   
    handleDebouncedChange(text)
  }
  
  const handleDebouncedChange = useCallback(debounce((text: string) => {
    props.onSearch && props.onSearch(text)
  }, delay), []);  

  const handleClearSearch = () => {
    setSearchText('')
    props.onSearch && props.onSearch('')
  }  
  
  return (
    <FormControl fullWidth>
      <Input
        id="search-textfield"
        placeholder={'Search'}               
        onChange={handleSearch}
        value={searchText}
        startAdornment= {
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment= {
          searchText.length > 0 &&
          <InputAdornment position="start">
            <CloseIcon onClick={handleClearSearch}/>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default Search
