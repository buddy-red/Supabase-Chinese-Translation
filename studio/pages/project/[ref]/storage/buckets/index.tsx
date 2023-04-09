import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'

import { API_URL } from 'lib/constants'
import { useFlag, useStore } from 'hooks'
import { useParams } from 'common/hooks'
import { post } from 'lib/common/fetch'
import { PROJECT_STATUS } from 'lib/constants'
import { StorageLayout } from 'components/layouts'
import ProductEmptyState from 'components/to-be-cleaned/ProductEmptyState'
import { useStorageStore } from 'localStores/storageExplorer/StorageExplorerStore'
import { NextPageWithLayout } from 'types'
import { useProjectApiQuery } from 'data/config/project-api-query'
import { find } from 'lodash'

/**
 * PageLayout is used to setup layout - as usual it will requires inject global store
 */
const PageLayout: NextPageWithLayout = ({}) => {
  const { ref } = useParams()
  const { ui } = useStore()
  const project = ui.selectedProject

  const storageStore = useStorageStore()
  const { openCreateBucketModal } = storageStore

  const kpsEnabled = useFlag('initWithKps')

  const { data: settings, isLoading } = useProjectApiQuery({ projectRef: ref })
  const apiService = settings?.autoApiService
  const serviceKey = find(apiService?.service_api_keys ?? [], (key) => key.tags === 'service_role')
  const canAccessStorage = !isLoading && apiService && serviceKey !== undefined

  useEffect(() => {
    if (project && project.status === PROJECT_STATUS.INACTIVE) {
      post(`${API_URL}/projects/${ref}/restore`, { kps_enabled: kpsEnabled })
    }
  }, [project])

  if (!project) return <div></div>

  return (
    <div className="storage-container flex flex-grow">
      <ProductEmptyState
        title="存储"
        ctaButtonLabel="新建存储桶"
        infoButtonLabel="关于存储"
        infoButtonUrl="https://www.supabase.cc/docs/guides/storage"
        onClickCta={openCreateBucketModal}
        disabled={!canAccessStorage}
        disabledMessage="您需要额外的权限以创建存储桶"
      >
        <p className="text-scale-1100 text-sm">
          创建存储桶来存储和提供任何类型的数字内容
        </p>
        <p className="text-scale-1100 text-sm">
          根据您的安全偏好，将您的存储桶设为私有或公开。
        </p>
      </ProductEmptyState>
    </div>
  )
}

PageLayout.getLayout = (page) => <StorageLayout title="Buckets">{page}</StorageLayout>

export default observer(PageLayout)
