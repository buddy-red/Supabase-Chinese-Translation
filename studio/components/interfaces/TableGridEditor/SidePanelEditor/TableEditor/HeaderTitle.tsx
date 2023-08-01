import { FC } from 'react'
import type { PostgresTable } from '@supabase/postgres-meta'

interface Props {
  schema: string
  table: PostgresTable
  isDuplicating: boolean
}

const HeaderTitle: FC<Props> = ({ schema, table, isDuplicating }) => {
  if (!table) {
    return (
      <>
        新建数据表 <code className="text-sm">{schema}</code>
      </>
    )
  }
  if (isDuplicating) {
    return (
      <>
        复制数据表 <code className="text-sm">{table.name}</code>
      </>
    )
  }
  return (
    <>
      更新数据表 <code className="text-sm">{table.name}</code>
    </>
  )
}

export default HeaderTitle
