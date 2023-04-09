import Link from 'next/link'
import { Button, IconAlertCircle } from 'ui'

export interface ClientLoadingErrorProps {
  projectRef: string
  description: string
}

const ClientLoadingError = ({
  projectRef,
  description = '出错',
}: ClientLoadingErrorProps) => {
  return (
    <div className="px-6 py-4 bg-scale-400 border border-scale-600 rounded flex justify-between items-center">
      <div className="flex space-x-4">
        <IconAlertCircle strokeWidth={1.5} className="text-scale-1100" />
        <div className="space-y-1">
          <p className="text-sm text-scale-1200">{description}</p>
          <p className="text-sm text-scale-1000">
            请刷新浏览器，如果此问题仍然存在，请通过技术支持与我们联系。
          </p>
        </div>
      </div>
      <Link href={`/support/new?ref=${projectRef}`}>
        <a target="_blank">
          <Button>技术支持</Button>
        </a>
      </Link>
    </div>
  )
}

export default ClientLoadingError
