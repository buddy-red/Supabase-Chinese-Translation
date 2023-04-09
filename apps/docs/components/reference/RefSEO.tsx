import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

function RefSEO({ title }) {
  const router = useRouter()

  const path = router.asPath.replace('crawlers/', '')

  return (
    <NextSeo
      title={title}
      openGraph={{
        title,
        url: `https://www.supabase.cc/docs${path}`,
        images: [
          {
            url: `https://www.supabase.cc/docs/img/supabase-og-image.png`,
          },
        ],
      }}
    />
  )
}

export default RefSEO
