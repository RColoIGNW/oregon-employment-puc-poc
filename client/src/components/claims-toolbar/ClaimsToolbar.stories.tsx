import React from 'react'
import ClaimsToolbar from '.'
import { action } from '@storybook/addon-actions'
import { number } from '@storybook/addon-knobs'

export default {
  title: 'ClaimsToolbar',
  component: ClaimsToolbar,
}

export const ClaimsToolbarNoSelection = () => {
  const selectedAmount = number("selectedAmount", 0)
  return (  
    <ClaimsToolbar 
      selectedAmount={selectedAmount}
      onClearSelection={action('Clear selection')}
      onCreate={action('OnCreate')}
      onEdit={action('OnEdit')}
      onSearch={action('OnSearch')}
      onDiscard={action('OnDiscard')}
      onDownload={action('OnDownload')}
    />
  )
}

export const ClaimsToolbarWithSelection = () => {
  return (  
    <ClaimsToolbar 
      selectedAmount={5}
      onClearSelection={action('Clear selection')}
      onCreate={action('OnCreate')}
      onEdit={action('OnEdit')}
      onSearch={action('OnSearch')}
      onDiscard={action('OnDiscard')}
      onDownload={action('OnDownload')}
    />
  )
}
