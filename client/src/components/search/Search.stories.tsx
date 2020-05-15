import { action } from "@storybook/addon-actions"
import { number, text, withKnobs } from "@storybook/addon-knobs"
import React from "react"

import Search from "."

export default {
  title: "Search",
  component: Search,
  decorators: [withKnobs],
}

export const SearchBasic = () => {
  return <Search onSearch={action("OnSearch")} />
}

export const SearchWithDelay = () => {
  const delay = number("delay", 4000)
  const placeholder = text("placeholder", "Search")

  return (
    <Search
      onSearch={action("OnSearch")}
      delay={delay}
      placeholder={placeholder}
    />
  )
}
