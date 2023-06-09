import { FC } from 'react'
import { compact, uniqBy } from 'lodash'
import { Menu, Item, Separator, Submenu } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'

import {
  STORAGE_VIEWS,
  STORAGE_SORT_BY,
  STORAGE_SORT_BY_ORDER,
  STORAGE_ROW_TYPES,
} from '../Storage.constants'
import { useStorageStore } from 'localStores/storageExplorer/StorageExplorerStore'
import { IconFolderPlus } from 'ui'

interface Props {
  id: string
}

const ColumnContextMenu: FC<Props> = ({ id = '' }) => {
  const storageExplorerStore = useStorageStore()
  const {
    columns,
    selectedItems,
    setSelectedItems,
    setView,
    setSortBy,
    setSortByOrder,
    addNewFolderPlaceholder,
  } = storageExplorerStore

  const onSelectCreateFolder = (columnIndex = -1) => {
    addNewFolderPlaceholder(columnIndex)
  }

  const onSelectAllItemsInColumn = (columnIndex: number) => {
    const columnFiles = columns[columnIndex].items
      .filter((item: any) => item.type === STORAGE_ROW_TYPES.FILE)
      .map((item: any) => {
        return { ...item, columnIndex }
      })
    const columnFilesId = compact(columnFiles.map((item: any) => item.id))
    const selectedItemsFromColumn = selectedItems.filter((item: any) =>
      columnFilesId.includes(item.id)
    )

    if (selectedItemsFromColumn.length === columnFiles.length) {
      // Deselect all items from column
      const updatedSelectedItems = selectedItems.filter(
        (item: any) => !columnFilesId.includes(item.id)
      )
      setSelectedItems(updatedSelectedItems)
    } else {
      // Select all items from column
      const updatedSelectedItems = uniqBy(selectedItems.concat(columnFiles), 'id')
      setSelectedItems(updatedSelectedItems)
    }
  }

  return (
    <Menu id={id} animation="fade" className="!bg-scale-300 border border-scale-500">
      <Item onClick={({ props }) => onSelectCreateFolder(props.index)}>
        <IconFolderPlus size="tiny" />
        <span className="ml-2 text-xs">New folder</span>
      </Item>
      <Separator />
      <Item onClick={({ props }) => onSelectAllItemsInColumn(props.index)}>
        <span className="ml-2 text-xs">Select all items</span>
      </Item>
      <Submenu
        label={
          <div>
            <span className="ml-2 text-xs">View</span>
          </div>
        }
      >
        <Item onClick={() => setView(STORAGE_VIEWS.COLUMNS)}>
          <span className="ml-2 text-xs">As columns</span>
        </Item>
        <Item onClick={() => setView(STORAGE_VIEWS.LIST)}>
          <span className="ml-2 text-xs">As list</span>
        </Item>
      </Submenu>
      <Submenu
        label={
          <div>
            <span className="ml-2 text-xs">Sort by</span>
          </div>
        }
      >
        <Item onClick={() => setSortBy(STORAGE_SORT_BY.NAME)}>
          <span className="ml-2 text-xs">Name</span>
        </Item>
        <Item onClick={() => setSortBy(STORAGE_SORT_BY.CREATED_AT)}>
          <span className="ml-2 text-xs">Last created</span>
        </Item>
        <Item onClick={() => setSortBy(STORAGE_SORT_BY.UPDATED_AT)}>
          <span className="ml-2 text-xs">Last modified</span>
        </Item>
        <Item onClick={() => setSortBy(STORAGE_SORT_BY.LAST_ACCESSED_AT)}>
          <span className="ml-2 text-xs">Last accessed</span>
        </Item>
      </Submenu>
      <Submenu
        label={
          <div>
            <span className="ml-2 text-xs">Sort by order</span>
          </div>
        }
      >
        <Item onClick={() => setSortByOrder(STORAGE_SORT_BY_ORDER.ASC)}>
          <span className="ml-2 text-xs">Ascending</span>
        </Item>
        <Item onClick={() => setSortByOrder(STORAGE_SORT_BY_ORDER.DESC)}>
          <span className="ml-2 text-xs">Descending</span>
        </Item>
      </Submenu>
    </Menu>
  )
}

export default ColumnContextMenu
