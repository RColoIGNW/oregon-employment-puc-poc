import React from 'react'
import Search from '.'
 import { actions } from '@storybook/addon-actions';
 import { withKnobs, number} from "@storybook/addon-knobs";

export default {
  title: 'Search',
  component: Search,
  decorators:[withKnobs]

}

const storyActionNames = actions('onSearch');

export const SearchStyled = () => {
  const delay = number("Delay", 1000)
  return (  
  <Search {...storyActionNames} delay={delay}/>
  )
}


// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
// import { withKnobs} from "@storybook/addon-knobs";


// storiesOf("Search Component", module)
//   .addDecorator(withKnobs)
//   .add("with text", () => (
//     <Search
//       onSearch={action("searching..")}
//     />
//   ));
