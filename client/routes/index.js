export default [
  {
    path: '/',
    name: 'Home',
    exact: true
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    auth: true
  },
  {
    path: '/error',
    name: 'Error',
    exact: true
  }
]
