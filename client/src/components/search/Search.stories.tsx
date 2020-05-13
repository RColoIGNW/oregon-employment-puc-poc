import React from 'react'
import Search from '.'
import { action } from '@storybook/addon-actions'
import { withKnobs, number, text} from '@storybook/addon-knobs'

export default {
  title: 'Search',
  component: Search,
  decorators:[withKnobs]

}

export const SearchBasic = () => { 
  return (
      <Search onSearch={action('OnSearch')} />
  )
}

export const SearchWithDelay = () => {
  const delay = number("delay", 4000)  
  const placeholder = text("placeholder", 'Search')  

  return (
      <Search onSearch={action('OnSearch')} delay={delay} placeholder={placeholder}/>
    
  )
}


