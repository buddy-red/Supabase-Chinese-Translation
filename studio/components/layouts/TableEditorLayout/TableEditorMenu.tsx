import { useMemo, useState } from 'react'
import { noop, partition } from 'lodash'
import { observer } from 'mobx-react-lite'
import {
  Alert,
  Button,
  Dropdown,
  IconCheck,
  IconChevronsDown,
  IconEdit,
  IconLoader,
  IconRefreshCw,
  IconSearch,
  IconX,
  Input,
  Listbox,
  Menu,
} from 'ui'
import * as Tooltip from '@radix-ui/react-tooltip'
import { PermissionAction } from '@supabase/shared-types/out/constants'
import type { PostgresSchema } from '@supabase/postgres-meta'

import { useParams } from 'common/hooks'
import { useCheckPermissions, useStore, useLocalStorage } from 'hooks'
import { useEntityTypesQuery } from 'data/entity-types/entity-types-infinite-query'
import { Entity } from 'data/entity-types/entity-type-query'
import { useProjectContext } from '../ProjectLayout/ProjectContext'
import InfiniteList from 'components/ui/InfiniteList'
import EntityListItem from './EntityListItem'

export interface TableEditorMenuProps {
  selectedSchema?: string
  onSelectSchema: (schema: string) => void
  onAddTable: () => void
  onEditTable: (table: Entity) => void
  onDeleteTable: (table: Entity) => void
  onDuplicateTable: (table: Entity) => void
}

const TableEditorMenu = ({
  selectedSchema,
  onSelectSchema = noop,
  onAddTable = noop,
  onEditTable = noop,
  onDeleteTable = noop,
  onDuplicateTable = noop,
}: TableEditorMenuProps) => {
  const { meta } = useStore()
  const { id } = useParams()

  const [searchText, setSearchText] = useState<string>('')
  const [sort, setSort] = useLocalStorage<'alphabetical' | 'grouped-alphabetical'>(
    'table-editor-sort',
    'alphabetical'
  )

  const { project } = useProjectContext()
  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isPreviousData: isSearching,
  } = useEntityTypesQuery(
    {
      projectRef: project?.ref,
      connectionString: project?.connectionString,
      schema: selectedSchema,
      search: searchText || undefined,
      sort,
    },
    {
      keepPreviousData: true,
    }
  )

  const totalCount = data?.pages?.[0].data.count
  const entityTypes = useMemo(
    () => data?.pages.flatMap((page) => page.data.entities),
    [data?.pages]
  )

  const schemas: PostgresSchema[] = meta.schemas.list()
  const schema = schemas.find((schema) => schema.name === selectedSchema)
  const canCreateTables = useCheckPermissions(PermissionAction.TENANT_SQL_ADMIN_WRITE, 'tables')

  const isLoadingTableMetadata = id ? !meta.tables.byId(id) : true

  const refreshTables = async () => {
    await refetch()
  }

  const [protectedSchemas, openSchemas] = partition(schemas, (schema) =>
    meta.excludedSchemas.includes(schema?.name ?? '')
  )
  const isLocked = protectedSchemas.some((s) => s.id === schema?.id)

  return (
    <div
      className="pt-6 flex flex-col flex-grow space-y-6 h-full"
      style={{ maxHeight: 'calc(100vh - 48px)' }}
    >
      {/* Schema selection dropdown */}
      <div className="px-3 mx-4">
        {!meta.schemas.isInitialized ? (
          <div className="flex h-[26px] items-center space-x-3 rounded border border-gray-500 px-3">
            <IconLoader className="animate-spin" size={12} />
            <span className="text-xs text-scale-900">加载模式...</span>
          </div>
        ) : meta.schemas.hasError ? (
          <Alert variant="warning" title="加载模式失败" className="!px-3 !py-3">
            <p className="mb-2">出错: {meta.schemas?.error?.message}</p>
            <Button type="default" size="tiny" onClick={() => meta.schemas.load()}>
              重新加载模式
            </Button>
          </Alert>
        ) : (
          <Listbox
            size="tiny"
            value={selectedSchema}
            onChange={(name: string) => {
              setSearchText('')
              onSelectSchema(name)
            }}
          >
            <Listbox.Option
              disabled
              key="normal-schemas"
              value="normal-schemas"
              label="模式"
              className="!w-[200px]"
            >
              <p className="text-xs text-scale-1100">模式</p>
            </Listbox.Option>
            {openSchemas.map((schema) => (
              <Listbox.Option
                key={schema.id}
                value={schema.name}
                label={schema.name}
                className="!w-[200px]"
                addOnBefore={() => <span className="text-scale-900 text-xs">模式</span>}
              >
                <span className="text-scale-1200 text-xs">{schema.name}</span>
              </Listbox.Option>
            ))}
            <Listbox.Option
              disabled
              key="protected-schemas"
              value="protected-schemas"
              label="Protected schemas"
              className="!w-[200px]"
            >
              <p className="text-xs text-scale-1100">Protected schemas</p>
            </Listbox.Option>
            {protectedSchemas.map((schema) => (
              <Listbox.Option
                key={schema.id}
                value={schema.name}
                label={schema.name}
                className="!w-[200px]"
                addOnBefore={() => <span className="text-scale-900 text-xs">schema</span>}
              >
                <span className="text-scale-1200 text-xs">{schema.name}</span>
              </Listbox.Option>
            ))}
          </Listbox>
        )}
      </div>

      <div className="space-y-1 mx-4">
        {!isLocked && (
          <div className="px-3">
            {/* Add new table button */}
            <Tooltip.Root delayDuration={0}>
              <Tooltip.Trigger className="w-full">
                <Button
                  asChild
                  block
                  disabled={!canCreateTables}
                  size="tiny"
                  icon={
                    <div className="text-scale-900">
                      <IconEdit size={14} strokeWidth={1.5} />
                    </div>
                  }
                  type="default"
                  style={{ justifyContent: 'start' }}
                  onClick={onAddTable}
                >
                  <span>新建数据表</span>
                </Button>
              </Tooltip.Trigger>
              {!canCreateTables && (
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
                        您需要额外的权限才能创建数据表
                      </span>
                    </div>
                  </Tooltip.Content>
                </Tooltip.Portal>
              )}
            </Tooltip.Root>
          </div>
        )}
        {/* Table search input */}
        <div className="mb-2 block px-3">
          <Input
            className="table-editor-search border-none"
            icon={
              isSearching ? (
                <IconLoader className="animate-spin text-scale-900" size={12} strokeWidth={1.5} />
              ) : (
                <IconSearch className="text-scale-900" size={12} strokeWidth={1.5} />
              )
            }
            placeholder="搜索数据表"
            onChange={(e) => setSearchText(e.target.value.trim())}
            value={searchText}
            size="tiny"
            actions={
              searchText && (
                <Button size="tiny" type="text" onClick={() => setSearchText('')}>
                  <IconX size={12} strokeWidth={2} />
                </Button>
              )
            }
          />
        </div>
      </div>

      {isLoading ? (
        <div className="mx-7 flex items-center space-x-2">
          <IconLoader className="animate-spin" size={14} strokeWidth={1.5} />
          <p className="text-sm text-scale-1000">加载实体...</p>
        </div>
      ) : searchText.length === 0 && (entityTypes?.length ?? 0) === 0 ? (
        <div className="mx-7 space-y-1 rounded-md border border-scale-400 bg-scale-300 py-3 px-4">
          <p className="text-xs">无实体可用</p>
          <p className="text-xs text-scale-1100">该模式尚无可用实体</p>
        </div>
      ) : searchText.length > 0 && (entityTypes?.length ?? 0) === 0 ? (
        <div className="mx-7 space-y-1 rounded-md border border-scale-400 bg-scale-300 py-3 px-4">
          <p className="text-xs">找不到结果</p>
          <p className="text-xs text-scale-1100">没有与您的搜索匹配的实体</p>
        </div>
      ) : (
        <Menu
          type="pills"
          className="flex flex-auto px-4 space-y-6 pb-4"
          ulClassName="flex flex-auto flex-col"
        >
          <Menu.Group
            // @ts-ignore
            title={
              <>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <p>数据表</p>
                    {totalCount !== undefined && (
                      <p style={{ fontVariantNumeric: 'tabular-nums' }}>({totalCount})</p>
                    )}
                  </div>

                  <div className="flex gap-3 items-center">
                    <Dropdown
                      size="small"
                      side="bottom"
                      align="start"
                      style={{ zIndex: 1 }}
                      overlay={[
                        <Dropdown.Item
                          key="alphabetical"
                          icon={
                            sort === 'alphabetical' ? (
                              <IconCheck size="tiny" />
                            ) : (
                              <div className="w-[14px] h-[14px]" />
                            )
                          }
                          onClick={() => {
                            setSort('alphabetical')
                          }}
                        >
                          按字母顺序
                        </Dropdown.Item>,
                        <Dropdown.Item
                          key="grouped-alphabetical"
                          icon={
                            sort === 'grouped-alphabetical' ? (
                              <IconCheck size="tiny" />
                            ) : (
                              <div className="w-[14px] h-[14px]" />
                            )
                          }
                          onClick={() => {
                            setSort('grouped-alphabetical')
                          }}
                        >
                          实体类型
                        </Dropdown.Item>,
                      ]}
                    >
                      <Tooltip.Root delayDuration={0}>
                        <Tooltip.Trigger asChild>
                          <div className="text-scale-900 transition-colors hover:text-scale-1200">
                            <IconChevronsDown size={18} strokeWidth={1} />
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content side="bottom">
                            <Tooltip.Arrow className="radix-tooltip-arrow" />
                            <div
                              className={[
                                'rounded bg-scale-100 py-1 px-2 leading-none shadow',
                                'border border-scale-200',
                              ].join(' ')}
                            >
                              <span className="text-xs">排序方式</span>
                            </div>
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Dropdown>

                    <button
                      className="cursor-pointer text-scale-900 transition-colors hover:text-scale-1200"
                      onClick={refreshTables}
                    >
                      <IconRefreshCw className={isRefetching ? 'animate-spin' : ''} size={14} />
                    </button>
                  </div>
                </div>
              </>
            }
          />

          <div className="flex flex-1">
            <InfiniteList
              items={entityTypes}
              ItemComponent={EntityListItem}
              itemProps={{
                projectRef: project?.ref,
                id: Number(id),
                onEditTable,
                onDeleteTable,
                onDuplicateTable,
                isLoadingTableMetadata,
              }}
              getItemSize={() => 28}
              hasNextPage={hasNextPage}
              isLoadingNextPage={isFetchingNextPage}
              onLoadNextPage={() => fetchNextPage()}
            />
          </div>
        </Menu>
      )}
    </div>
  )
}

export default observer(TableEditorMenu)
