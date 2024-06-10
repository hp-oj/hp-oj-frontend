import type { UserVO } from '@/openapi'

/**
 * 权限定义
 */

export enum ACCESS_ENUM {
  BAN = 'ban',
  USER = 'user',
  ADMIN = 'admin',
}


/**
 * 检查权限
 * @param user
 * @param role
 */
export function checkAccess(user: UserVO, role: 'ban' | 'user' | 'admin'): boolean {
  const loginUserAccess = user?.role || ACCESS_ENUM.USER
  // 禁用用户不能进入
  if (role === ACCESS_ENUM.BAN) {
    return false
  }
  // 权限要求为用户，那么管理员和用户都能进
  if (role === ACCESS_ENUM.USER) {
    if (!(loginUserAccess === ACCESS_ENUM.USER || loginUserAccess === ACCESS_ENUM.ADMIN)) {
      return false
    }
  }
  // 管理员的话，只能是管理员进
  if (role === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false
    }
  }
  return true
}
