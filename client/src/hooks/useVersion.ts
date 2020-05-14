import { graphql, useStaticQuery } from "gatsby"
import { useEffect } from 'react'

import storage from "../util/storage"

export default () => {
  const data = useStaticQuery(graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
        url
        keywords
        image
        version
      }
    }
  }
`)
const { siteMetadata = {} } = data?.site || {}
  useEffect(() => {
    const checkVersion = async () => {
      if (storage.load('version') !== siteMetadata.version) {
        localStorage.clear()
        storage.save('version', siteMetadata.version)
        window.location.reload()
        console.info('Cleared Storage for new App Version.')
      }
    }
    checkVersion()
    return () => {
      storage.save('version', siteMetadata.version)
    }
  })
}
