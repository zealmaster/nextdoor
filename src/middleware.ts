import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || ""
  const url = new URL(req.url)
  const loginPath = url.pathname
  if (token && (loginPath === '/login' || loginPath === '/signup' || loginPath === '/')) {
    return NextResponse.redirect(new URL('/forum', req.url))
  }
  if (!token && (loginPath === '/forum' || loginPath === '/logout')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/signup', '/forum', '/'],
}
