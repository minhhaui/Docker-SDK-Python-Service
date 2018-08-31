import { message } from 'antd';

export const domain = ''

export const dashboardRoute = domain + '/dashboard'

export const createUserRoute = domain + '/users/create'
export const updateUserRoute = domain + '/users/update'
export const usersRoute = domain + '/users'
export const userDetailRoute = domain + '/users/info'
export const userDeleteRoute = domain + '/users/delete'

export const containersRoute = domain + '/containers'
export const containersCreateRoute = domain + '/containers/create'
export const containersDetailRoute = domain + '/containers/info'
export const containersUpdateRoute = domain + '/containers/update'
export const containersDeleteRoute = domain + '/containers/delete'

export const imagesRoute = domain + '/images'
export const imagesCreateRoute = domain + '/images/create'
export const imagesDetailRoute = domain + '/images/info'
export const imagesUpdateRoute = domain + '/images/update'
export const imagesDeleteRoute = domain + '/images/delete'
export const imagesSearchRoute = domain + '/images/search'

export const loginRoute = domain + '/login'
export const logoutRoute = domain + '/logout'

export const mess = {
  show: function(type = 'success', mess = 'Thành công!', duration = 1) {
    switch(type) {
      case 'success':
        message.success(mess, duration)
        break;
      case 'error':
        message.error(mess, duration)
        break;
      default:
        message.info(mess, duration)
    }
  }
}
