import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Button, Menu, IconLoader, Alert, IconEdit } from 'ui'
import { PermissionAction } from '@supabase/shared-types/out/constants'

import { checkPermissions } from 'hooks'
import { useParams } from 'common/hooks'
import BucketRow from './BucketRow'
import { useStorageStore } from 'localStores/storageExplorer/StorageExplorerStore'

interface Props {}

const StorageMenu: FC<Props> = () => {
  const router = useRouter()
  const { ref, bucketId } = useParams()
  const canCreateBuckets = checkPermissions(PermissionAction.STORAGE_ADMIN_WRITE, '*')

  const page = router.pathname.split('/')[4] as
    | undefined
    | 'policies'
    | 'settings'
    | 'usage'
    | 'logs'

  const storageExplorerStore = useStorageStore()
  const {
    loaded,
    buckets,
    openCreateBucketModal,
    openDeleteBucketModal,
    openToggleBucketPublicModal,
  } = storageExplorerStore || {}

  return (
    <Menu type="pills" className="my-6 flex flex-grow flex-col px-5">
      <div className="mb-6 px-2">
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger className="w-full">
            <Button
              block
              type="default"
              icon={
                <div className="text-scale-900">
                  <IconEdit size={14} />
                </div>
              }
              disabled={!canCreateBuckets}
              style={{ justifyContent: 'start' }}
              onClick={openCreateBucketModal}
            >
              新建存储桶
            </Button>
          </Tooltip.Trigger>
          {!canCreateBuckets && (
            <Tooltip.Portal>
              <Tooltip.Content side="bottom">
                <Tooltip.Arrow className="radix-tooltip-arrow" />
                <div
                  className={[
                    'rounded bg-scale-100 py-1 px-2 leading-none shadow',
                    'border border-scale-200',
                  ].join(' ')}
                >
                  <span className="text-xs text-scale-1200">
                    您需要额外的权限才能创建存储桶
                  </span>
                </div>
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </Tooltip.Root>
      </div>
      <div className="space-y-6">
        <div className="">
          <div>
            <Menu.Group title="所有存储桶" />
            {!loaded ? (
              <div className="flex items-center space-x-2 py-2 px-2">
                <IconLoader className="animate-spin" size={14} strokeWidth={2} />
                <span className="text-sm">加载存储桶</span>
              </div>
            ) : (
              <>
                {buckets.length === 0 && (
                  <div className="px-2">
                    <Alert title="无存储桶可用">
                      您创建的存储桶将显示于此
                    </Alert>
                  </div>
                )}
                {buckets.map((bucket: any, idx: number) => {
                  const isSelected = bucketId === bucket.id
                  return (
                    <BucketRow
                      key={`${idx}_${bucket.id}`}
                      bucket={bucket}
                      projectRef={ref}
                      isSelected={isSelected}
                      onSelectDeleteBucket={openDeleteBucketModal}
                      onSelectToggleBucketPublic={openToggleBucketPublicModal}
                    />
                  )
                })}
              </>
            )}
          </div>
        </div>
        <div className="h-px w-full bg-scale-500"></div>
        <div className="">
          <Menu.Group title="配置" />
          <Link href={`/project/${ref}/storage/policies`}>
            <Menu.Item rounded active={page === 'policies'}>
              <p className="truncate">策略</p>
            </Menu.Item>
          </Link>
        </div>
      </div>
    </Menu>
  )
}

export default observer(StorageMenu)
