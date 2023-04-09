import {
  IconArchive,
  IconBarChart,
  IconCode,
  IconDatabase,
  IconFileText,
  IconList,
  IconSettings,
  IconUsers,
} from 'ui'
import SVG from 'react-inlinesvg'

import { ProjectBase } from 'types'
import { Route } from 'components/ui/ui.types'
import { BASE_PATH, IS_PLATFORM, PROJECT_STATUS } from 'lib/constants'
import { SHOW_O11Y } from 'components/interfaces/Settings/Logs'

export const generateToolRoutes = (ref?: string, project?: ProjectBase): Route[] => {
  const isProjectBuilding = project?.status === PROJECT_STATUS.COMING_UP
  const isProjectPaused = project?.status === PROJECT_STATUS.INACTIVE

  const homeUrl = `/project/${ref}`
  const buildingUrl = `/project/${ref}/building`

  return [
    {
      key: 'editor',
      label: '数据表编辑器',
      icon: (
        <SVG
          src={`${BASE_PATH}/img/table-editor.svg`}
          style={{ width: `${18}px`, height: `${18}px` }}
          preProcessor={(code) => code.replace(/svg/, 'svg class="m-auto text-color-inherit"')}
        />
      ),
      link:
        ref &&
        (isProjectPaused ? homeUrl : isProjectBuilding ? buildingUrl : `/project/${ref}/editor`),
    },
    {
      key: 'sql',
      label: 'SQL编辑器',
      icon: (
        <SVG
          src={`${BASE_PATH}/img/sql-editor.svg`}
          style={{ width: `${18}px`, height: `${18}px` }}
          preProcessor={(code) => code.replace(/svg/, 'svg class="m-auto text-color-inherit"')}
        />
      ),
      link:
        ref &&
        (isProjectPaused ? homeUrl : isProjectBuilding ? buildingUrl : `/project/${ref}/sql`),
    },
  ]
}
export const generateProductRoutes = (ref?: string, project?: ProjectBase): Route[] => {
  const isProjectBuilding = project?.status !== PROJECT_STATUS.ACTIVE_HEALTHY
  const isProjectPaused = project?.status === PROJECT_STATUS.INACTIVE

  const homeUrl = `/project/${ref}`
  const buildingUrl = `/project/${ref}/building`

  return [
    {
      key: 'database',
      label: '数据库',
      icon: <IconDatabase size={18} strokeWidth={2} />,
      link:
        ref &&
        (isProjectPaused
          ? homeUrl
          : isProjectBuilding
          ? buildingUrl
          : `/project/${ref}/database/tables`),
    },
    {
      key: 'auth',
      label: '身份验证',
      icon: <IconUsers size={18} strokeWidth={2} />,
      link:
        ref &&
        (isProjectPaused
          ? homeUrl
          : isProjectBuilding
          ? buildingUrl
          : `/project/${ref}/auth/users`),
    },
    {
      key: 'storage',
      label: '存储',
      icon: <IconArchive size={18} strokeWidth={2} />,
      link:
        ref &&
        (isProjectPaused
          ? homeUrl
          : isProjectBuilding
          ? buildingUrl
          : `/project/${ref}/storage/buckets`),
    },
    ...(IS_PLATFORM
      ? [
          {
            key: 'functions',
            label: 'Edge Functions',
            icon: <IconCode size={18} strokeWidth={2} />,
            link:
              ref &&
              (isProjectPaused
                ? homeUrl
                : isProjectBuilding
                ? buildingUrl
                : `/project/${ref}/functions`),
          },
        ]
      : []),
  ]
}

export const generateOtherRoutes = (ref?: string, project?: ProjectBase): Route[] => {
  const isProjectBuilding = project?.status === PROJECT_STATUS.COMING_UP
  const isProjectPaused = project?.status === PROJECT_STATUS.INACTIVE

  const homeUrl = `/project/${ref}`
  const buildingUrl = `/project/${ref}/building`

  return [
    ...(IS_PLATFORM
      ? [
          {
            key: 'reports',
            label: '报告',
            icon: <IconBarChart size={18} strokeWidth={2} />,
            link:
              ref &&
              (isProjectPaused
                ? homeUrl
                : isProjectBuilding
                ? buildingUrl
                : `/project/${ref}/reports`),
          },
        ]
      : []),
    ...(SHOW_O11Y
      ? [
          {
            key: 'logs',
            label: '日志',
            icon: <IconList size={18} strokeWidth={2} />,
            link:
              ref &&
              (isProjectPaused
                ? homeUrl
                : isProjectBuilding
                ? buildingUrl
                : `/project/${ref}/logs/explorer`),
          },
        ]
      : []),
    {
      key: 'api',
      label: 'API文档',
      icon: <IconFileText size={18} strokeWidth={2} />,
      link:
        ref &&
        (isProjectPaused ? homeUrl : isProjectBuilding ? buildingUrl : `/project/${ref}/api`),
    },
    ...(IS_PLATFORM
      ? [
          {
            key: 'settings',
            label: '项目设置',
            icon: <IconSettings size={18} strokeWidth={2} />,
            link: ref && `/project/${ref}/settings/general`,
          },
        ]
      : []),
  ]
}
