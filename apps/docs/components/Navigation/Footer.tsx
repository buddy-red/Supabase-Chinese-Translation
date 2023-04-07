import Image from 'next/image'
import Link from 'next/link'
import { Button, IconGitHub, IconTwitter, IconYoutube } from '~/../../packages/ui'
import footerData from '~/data/footer.json'
import { useTheme } from 'common/Providers'

const Footer = () => {
  const { isDarkMode } = useTheme()
  return (
    <div>
      <hr className="border-scale-400  mt-8"></hr>
    </div>
  )
}

export default Footer
