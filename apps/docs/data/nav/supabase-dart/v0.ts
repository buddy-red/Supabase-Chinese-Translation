const Nav = [
  {
    label: '快速上手',
    items: [
      { name: 'Supabase Dart Library', url: '/reference/dart/v0', items: [] },
      { name: 'Installing', url: '/reference/dart/v0/installing', items: [] },
      { name: 'Initializing', url: '/reference/dart/v0/initializing', items: [] },
    ],
  },
  {
    label: 'Auth',
    items: [
      { name: 'signUp()', url: '/reference/dart/v0/auth-signup', items: [] },
      { name: 'signIn()', url: '/reference/dart/v0/auth-signin', items: [] },
      {
        name: 'signInWithProvider()',
        url: '/reference/dart/v0/auth-signinwithprovider',
        items: [],
      },
      { name: 'signOut()', url: '/reference/dart/v0/auth-signout', items: [] },
      { name: 'session()', url: '/reference/dart/v0/auth-session', items: [] },
      { name: 'user()', url: '/reference/dart/v0/auth-user', items: [] },
      { name: 'update()', url: '/reference/dart/v0/auth-update', items: [] },
      {
        name: 'onAuthStateChange()',
        url: '/reference/dart/v0/auth-onauthstatechanged',
        items: [],
      },
      {
        name: 'Reset Password (Email)',
        url: '/reference/dart/v0/reset-password-email',
        items: [],
      },
    ],
  },
  {
    label: 'Functions',
    items: [{ name: 'invoke()', url: '/reference/dart/v0/invoke', items: [] }],
  },
  {
    label: 'Database',
    items: [
      { name: 'Fetch data: select()', url: '/reference/dart/v0/select', items: [] },
      { name: 'Create data: insert()', url: '/reference/dart/v0/insert', items: [] },
      { name: 'Modify data: update()', url: '/reference/dart/v0/update', items: [] },
      { name: 'Upsert data: upsert()', url: '/reference/dart/v0/upsert', items: [] },
      { name: 'Delete data: delete()', url: '/reference/dart/v0/delete', items: [] },
      { name: 'Stored Procedures: rpc()', url: '/reference/dart/v0/rpc', items: [] },
    ],
  },
  {
    label: 'Realtime',
    items: [
      { name: 'stream', url: '/reference/dart/v0/stream', items: [] },
      { name: 'on().subscribe()', url: '/reference/dart/v0/subscribe', items: [] },
      {
        name: 'removeSubscription()',
        url: '/reference/dart/v0/removesubscription',
        items: [],
      },
      { name: 'getSubscriptions()', url: '/reference/dart/v0/getsubscriptions', items: [] },
    ],
  },
  {
    label: 'Storage',
    items: [
      { name: 'createBucket()', url: '/reference/dart/v0/storage-createbucket', items: [] },
      { name: 'getBucket()', url: '/reference/dart/v0/storage-getbucket', items: [] },
      { name: 'listBuckets()', url: '/reference/dart/v0/storage-listbuckets', items: [] },
      { name: 'updateBucket()', url: '/reference/dart/v0/storage-updatebucket', items: [] },
      { name: 'deleteBucket()', url: '/reference/dart/v0/storage-deletebucket', items: [] },
      { name: 'emptyBucket()', url: '/reference/dart/v0/storage-emptybucket', items: [] },
      { name: 'from.upload()', url: '/reference/dart/v0/storage-from-upload', items: [] },
      { name: 'from.download()', url: '/reference/dart/v0/storage-from-download', items: [] },
      { name: 'from.list()', url: '/reference/dart/v0/storage-from-list', items: [] },
      { name: 'from.update()', url: '/reference/dart/v0/storage-from-update', items: [] },
      { name: 'from.move()', url: '/reference/dart/v0/storage-from-move', items: [] },
      { name: 'from.remove()', url: '/reference/dart/v0/storage-from-remove', items: [] },
      {
        name: 'from.createSignedUrl()',
        url: '/reference/dart/v0/storage-from-createsignedurl',
        items: [],
      },
      {
        name: 'from.getPublicUrl()',
        url: '/reference/dart/v0/storage-from-getpublicurl',
        items: [],
      },
    ],
  },
  {
    label: 'Filters',
    items: [
      { name: 'Using Filters', url: '/reference/dart/v0/using-filters', items: [] },
      { name: 'eq()', url: '/reference/dart/v0/eq', items: [] },
      { name: 'neq()', url: '/reference/dart/v0/neq', items: [] },
      { name: 'gt()', url: '/reference/dart/v0/gt', items: [] },
      { name: 'gte()', url: '/reference/dart/v0/gte', items: [] },
      { name: 'lt()', url: '/reference/dart/v0/lt', items: [] },
      { name: 'lte()', url: '/reference/dart/v0/lte', items: [] },
      { name: 'like()', url: '/reference/dart/v0/like', items: [] },
      { name: 'ilike()', url: '/reference/dart/v0/ilike', items: [] },
      { name: 'is_()', url: '/reference/dart/v0/is_', items: [] },
      { name: 'in_()', url: '/reference/dart/v0/in_', items: [] },
      { name: 'contains()', url: '/reference/dart/v0/contains', items: [] },
      { name: 'containedBy()', url: '/reference/dart/v0/containedby', items: [] },
      { name: 'rangeGt()', url: '/reference/dart/v0/rangegt', items: [] },
      { name: 'rangeGte()', url: '/reference/dart/v0/rangegte', items: [] },
      { name: 'rangeLt()', url: '/reference/dart/v0/rangelt', items: [] },
      { name: 'rangeLte()', url: '/reference/dart/v0/rangelte', items: [] },
      { name: 'rangeAdjacent()', url: '/reference/dart/v0/rangeadjacent', items: [] },
      { name: 'overlaps()', url: '/reference/dart/v0/overlaps', items: [] },
      { name: 'textSearch()', url: '/reference/dart/v0/textsearch', items: [] },
      { name: 'match()', url: '/reference/dart/v0/match', items: [] },
      { name: 'not()', url: '/reference/dart/v0/not', items: [] },
      { name: 'or()', url: '/reference/dart/v0/or', items: [] },
      { name: 'filter()', url: '/reference/dart/v0/filter', items: [] },
    ],
  },
  {
    label: 'Modifiers',
    items: [
      { name: 'Using Modifiers', url: '/reference/dart/v0/using-modifiers', items: [] },
      { name: 'order()', url: '/reference/dart/v0/order', items: [] },
      { name: 'limit()', url: '/reference/dart/v0/limit', items: [] },
      { name: 'range()', url: '/reference/dart/v0/range', items: [] },
      { name: 'single()', url: '/reference/dart/v0/single', items: [] },
    ],
  },
]

export default Nav
