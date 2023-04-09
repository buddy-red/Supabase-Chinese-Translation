import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { find } from 'lodash'

import { API_URL } from 'lib/constants'
import { useFlag, useStore } from 'hooks'
import { post } from 'lib/common/fetch'
import { PROJECT_STATUS } from 'lib/constants'
import { StorageLayout } from 'components/layouts'
import ProductEmptyState from 'components/to-be-cleaned/ProductEmptyState'
import { StorageExplorer } from 'components/to-be-cleaned/Storage'
import { useStorageStore } from 'localStores/storageExplorer/StorageExplorerStore'
import { NextPageWithLayout } from 'types'

/**
 * PageLayout is used to setup layout - as usual it will requires inject global store
 */
const PageLayout: NextPageWithLayout = () => {
  const router = useRouter()
  const { ref, bucketId } = router.query

  const { ui } = useStore()
  const project = ui.selectedProject

  const storageStore = useStorageStore()
  const { buckets, loaded, openCreateBucketModal } = storageStore

  const kpsEnabled = useFlag('initWithKps')

  useEffect(() => {
    if (project && project.status === PROJECT_STATUS.INACTIVE) {
      post(`${API_URL}/projects/${ref}/restore`, { kps_enabled: kpsEnabled })
    }
  }, [project])

  if (!project) return <div></div>

  const bucket = find(buckets, { id: bucketId })

  return (
    <div className="storage-container flex flex-grow p-4">
      {loaded ? (
        !bucket ? (
          <div className="flex h-full w-full items-center justify-center">
            <ProductEmptyState
              title="存储"
              ctaButtonLabel="新建存储桶"
              infoButtonLabel="关于存储"
              infoButtonUrl="https://www.supabase.cc/docs/guides/storage"
              onClickCta={openCreateBucketModal}
            >
              <p className="text-scale-1100 text-sm">
                创建存储桶来存储和提供任何类型的数字内容
              </p>
              <p className="text-scale-1100 text-sm">
                根据您的安全偏好，将您的存储桶设为私有或公开。
              </p>
            </ProductEmptyState>
          </div>
        ) : (
          // @ts-ignore
          <StorageExplorer bucket={bucket} />
        )
      ) : (
        <div />
      )}
    </div>
  )
}

PageLayout.getLayout = (page) => <StorageLayout title="Buckets">{page}</StorageLayout>

export default observer(PageLayout)
