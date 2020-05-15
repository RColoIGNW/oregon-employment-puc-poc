import { FormControl, Input, InputAdornment } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import SearchIcon from "@material-ui/icons/Search"
import { debounce } from "lodash"
import React, { FunctionComponent, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"

interface SearchProps {
  onSearch: (text: string) => void
  delay?: number
  placeholder?: string
}

const DEFAULT_DELAY = 1000
// TODO: Add to translation
const PLACEHOLDER_KEY = "common.search"

const Search: FunctionComponent<SearchProps> = (props: SearchProps) => {
  const [searchText, setSearchText] = useState("")
  const delay = props.delay || DEFAULT_DELAY
  const { t } = useTranslation()
  const placeholder = t(props.placeholder || PLACEHOLDER_KEY)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
    const text = event.target.value.toLowerCase().trim()
    console.log(new Date().getTime())
    handleDebouncedChange(text)
  }

  const handleDebouncedChange = useCallback(
    debounce((text: string) => {
      console.log(new Date().getTime())
      props.onSearch && props.onSearch(text)
    }, delay),
    []
  )

  const handleClearSearch = () => {
    setSearchText("")
    props.onSearch && props.onSearch("")
  }

  return (
    <FormControl fullWidth={true}>
      <Input
        id="search-textfield"
        placeholder={placeholder}
        onChange={handleSearch}
        value={searchText}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          searchText.length > 0 && (
            <InputAdornment position="start">
              <CloseIcon onClick={handleClearSearch} />
            </InputAdornment>
          )
        }
      />
    </FormControl>
  )
}

export default Search
