const Nav = [
  {
    label: '快速上手',
    items: [
      { name: 'Supabase JavaScript Library', url: '/reference/javascript', items: [] },
      { name: 'Installing', url: '/reference/javascript/installing', items: [] },
      { name: 'Initializing', url: '/reference/javascript/initializing', items: [] },
      { name: 'Typescript Support', url: '/reference/javascript/typescript-support', items: [] },
      { name: 'Release Notes', url: '/reference/javascript/release-notes', items: [] },
      {
        name: 'Upgrading to supabase-js v2',
        url: '/reference/javascript/upgrade-guide',
        items: [],
      },
    ],
  },
  {
    label: 'Auth',
    items: [
      { name: 'signUp()', url: '/reference/javascript/auth-signup', items: [] },
      {
        name: 'signInWithPassword()',
        url: '/reference/javascript/auth-signinwithpassword',
        items: [],
      },
      { name: 'signInWithOtp()', url: '/reference/javascript/auth-signinwithotp', items: [] },
      { name: 'signInWithOAuth()', url: '/reference/javascript/auth-signinwithoauth', items: [] },
      { name: 'signOut()', url: '/reference/javascript/auth-signout', items: [] },
      { name: 'verifyOtp()', url: '/reference/javascript/auth-verifyotp', items: [] },
      { name: 'getSession()', url: '/reference/javascript/auth-getsession', items: [] },
      { name: 'refreshSession()', url: '/reference/javascript/auth-refreshsession', items: [] },
      { name: 'getUser()', url: '/reference/javascript/auth-getuser', items: [] },
      { name: 'updateUser()', url: '/reference/javascript/auth-updateuser', items: [] },
      { name: 'setSession()', url: '/reference/javascript/auth-setsession', items: [] },
      {
        name: 'onAuthStateChange()',
        url: '/reference/javascript/auth-onauthstatechange',
        items: [],
      },
      {
        name: 'resetPasswordForEmail()',
        url: '/reference/javascript/auth-resetpasswordforemail',
        items: [],
      },
    ],
  },
  {
    label: 'Auth (Server Only)',
    items: [
      { name: 'Overview', url: '/reference/javascript/supabase-auth-admin-api', items: [] },
      { name: 'listUsers()', url: '/reference/javascript/auth-admin-listusers', items: [] },
      { name: 'createUser()', url: '/reference/javascript/auth-admin-createuser', items: [] },
      { name: 'deleteUser()', url: '/reference/javascript/auth-admin-deleteuser', items: [] },
      { name: 'generateLink()', url: '/reference/javascript/auth-admin-generatelink', items: [] },
      {
        name: 'inviteUserByEmail()',
        url: '/reference/javascript/auth-admin-inviteuserbyemail',
        items: [],
      },
      { name: 'getUserById()', url: '/reference/javascript/auth-admin-getuserbyid', items: [] },
      {
        name: 'updateUserById()',
        url: '/reference/javascript/auth-admin-updateuserbyid',
        items: [],
      },
    ],
  },
  {
    label: 'Database',
    items: [
      { name: 'Fetch data: select()', url: '/reference/javascript/select', items: [] },
      { name: 'Create data: insert()', url: '/reference/javascript/insert', items: [] },
      { name: 'Modify data: update()', url: '/reference/javascript/update', items: [] },
      { name: 'Upsert data: upsert()', url: '/reference/javascript/upsert', items: [] },
      { name: 'Delete data: delete()', url: '/reference/javascript/delete', items: [] },
      { name: 'Postgres functions: rpc()', url: '/reference/javascript/rpc', items: [] },
      {
        name: 'Filters',
        url: undefined,
        items: [
          { name: 'Using Filters', url: '/reference/javascript/using-filters', items: [] },
          { name: 'eq()', url: '/reference/javascript/eq', items: [] },
          { name: 'neq()', url: '/reference/javascript/neq', items: [] },
          { name: 'gt()', url: '/reference/javascript/gt', items: [] },
          { name: 'gte()', url: '/reference/javascript/gte', items: [] },
          { name: 'lt()', url: '/reference/javascript/lt', items: [] },
          { name: 'lte()', url: '/reference/javascript/lte', items: [] },
          { name: 'like()', url: '/reference/javascript/like', items: [] },
          { name: 'ilike()', url: '/reference/javascript/ilike', items: [] },
          { name: 'is()', url: '/reference/javascript/is', items: [] },
          { name: 'in()', url: '/reference/javascript/in', items: [] },
          { name: 'contains()', url: '/reference/javascript/contains', items: [] },
          { name: 'containedBy()', url: '/reference/javascript/containedby', items: [] },
          { name: 'rangeGt()', url: '/reference/javascript/rangegt', items: [] },
          { name: 'rangeGte()', url: '/reference/javascript/rangegte', items: [] },
          { name: 'rangeLt()', url: '/reference/javascript/rangelt', items: [] },
          { name: 'rangeLte()', url: '/reference/javascript/rangelte', items: [] },
          { name: 'rangeAdjacent()', url: '/reference/javascript/rangeadjacent', items: [] },
          { name: 'overlaps()', url: '/reference/javascript/overlaps', items: [] },
          { name: 'textSearch()', url: '/reference/javascript/textsearch', items: [] },
          { name: 'match()', url: '/reference/javascript/match', items: [] },
          { name: 'not()', url: '/reference/javascript/not', items: [] },
          { name: 'or()', url: '/reference/javascript/or', items: [] },
          { name: 'filter()', url: '/reference/javascript/filter', items: [] },
        ],
      },
      {
        name: 'Modifiers',
        url: undefined,
        items: [
          { name: 'Using Modifiers', url: '/reference/javascript/using-modifiers', items: [] },
          { name: 'select()', url: '/reference/javascript/db-modifiers-select', items: [] },
          { name: 'order()', url: '/reference/javascript/order', items: [] },
          { name: 'limit()', url: '/reference/javascript/limit', items: [] },
          { name: 'range()', url: '/reference/javascript/range', items: [] },
          { name: 'abortSignal()', url: '/reference/javascript/db-abortsignal', items: [] },
          { name: 'single()', url: '/reference/javascript/single', items: [] },
          { name: 'maybeSingle()', url: '/reference/javascript/maybesingle', items: [] },
          { name: 'csv()', url: '/reference/javascript/db-csv', items: [] },
        ],
      },
    ],
  },
  {
    label: 'Functions',
    items: [{ name: 'invoke()', url: '/reference/javascript/invoke', items: [] }],
  },
  {
    label: 'Realtime',
    items: [
      { name: 'on().subscribe()', url: '/reference/javascript/subscribe', items: [] },
      { name: 'removeChannel()', url: '/reference/javascript/removechannel', items: [] },
      { name: 'removeAllChannels()', url: '/reference/javascript/removeallchannels', items: [] },
      { name: 'getChannels()', url: '/reference/javascript/getchannels', items: [] },
    ],
  },
  {
    label: 'Storage',
    items: [
      { name: 'createBucket()', url: '/reference/javascript/storage-createbucket', items: [] },
      { name: 'getBucket()', url: '/reference/javascript/storage-getbucket', items: [] },
      { name: 'listBuckets()', url: '/reference/javascript/storage-listbuckets', items: [] },
      { name: 'updateBucket()', url: '/reference/javascript/storage-updatebucket', items: [] },
      { name: 'deleteBucket()', url: '/reference/javascript/storage-deletebucket', items: [] },
      { name: 'emptyBucket()', url: '/reference/javascript/storage-emptybucket', items: [] },
      { name: 'from.upload()', url: '/reference/javascript/storage-from-upload', items: [] },
      { name: 'from.download()', url: '/reference/javascript/storage-from-download', items: [] },
      { name: 'from.list()', url: '/reference/javascript/storage-from-list', items: [] },
      { name: 'from.update()', url: '/reference/javascript/storage-from-update', items: [] },
      { name: 'from.move()', url: '/reference/javascript/storage-from-move', items: [] },
      { name: 'from.copy()', url: '/reference/javascript/storage-from-copy', items: [] },
      { name: 'from.remove()', url: '/reference/javascript/storage-from-remove', items: [] },
      {
        name: 'from.createSignedUrl()',
        url: '/reference/javascript/storage-from-createsignedurl',
        items: [],
      },
      {
        name: 'from.createSignedUrls()',
        url: '/reference/javascript/storage-from-createsignedurls',
        items: [],
      },
      {
        name: 'from.getPublicUrl()',
        url: '/reference/javascript/storage-from-getpublicurl',
        items: [],
      },
    ],
  },
]

export default Nav
