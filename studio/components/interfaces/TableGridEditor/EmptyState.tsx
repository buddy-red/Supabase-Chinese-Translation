import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { PermissionAction } from '@supabase/shared-types/out/constants'
import { useCheckPermissions, useLocalStorage, useStore } from 'hooks'
import { useEntityTypesQuery } from 'data/entity-types/entity-types-infinite-query'
import ProductEmptyState from 'components/to-be-cleaned/ProductEmptyState'
import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'

interface Props {
  selectedSchema: string
  onAddTable: () => void
}

const EmptyState: FC<Props> = ({ selectedSchema, onAddTable }) => {
  const { meta } = useStore()
  const isProtectedSchema = meta.excludedSchemas.includes(selectedSchema)
  const canCreateTables =
    useCheckPermissions(PermissionAction.TENANT_SQL_ADMIN_WRITE, 'tables') && !isProtectedSchema

  const [sort] = useLocalStorage<'alphabetical' | 'grouped-alphabetical'>(
    'table-editor-sort',
    'alphabetical'
  )

  const { project } = useProjectContext()
  const { data } = useEntityTypesQuery(
    {
      projectRef: project?.ref,
      connectionString: project?.connectionString,
      schema: selectedSchema,
      sort,
    },
    {
      keepPreviousData: true,
    }
  )

  const totalCount = data?.pages?.[0].data.count ?? 0

  return (
    <div className="w-full h-full flex items-center justify-center">
      {totalCount === 0 ? (
        <ProductEmptyState
          title="数据表编辑器"
          ctaButtonLabel={canCreateTables ? '新建数据表' : undefined}
          onClickCta={canCreateTables ? onAddTable : undefined}
        >
          <p className="text-sm text-scale-1100">该模式中没有可用的数据表表</p>
        </ProductEmptyState>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <ProductEmptyState
            title="数据表编辑器"
            ctaButtonLabel={canCreateTables ? '新建数据表' : undefined}
            onClickCta={canCreateTables ? onAddTable : undefined}
          >
            <p className="text-sm text-scale-1100">
              在左侧导航面板中选择一个数据表，即可查看其数据。
              {canCreateTables && ', 或新建一个'}
            </p>
          </ProductEmptyState>
        </div>
      )}
    </div>
  )
}

export default observer(EmptyState)
