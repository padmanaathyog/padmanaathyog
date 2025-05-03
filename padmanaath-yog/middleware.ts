import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  // Fetch session and handle errors
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error fetching session:', error);
      return NextResponse.error(); // Or custom error response
    }

    // For admin routes, check if the user is authenticated
    if (request.nextUrl.pathname.startsWith("/admin-dashboard")) {
      if (!session) {
        // Don't redirect if already on the admin dashboard page
        if (request.nextUrl.pathname === "/admin-dashboard") {
          return response
        }
        return NextResponse.redirect(new URL("/admin-dashboard", request.url))
      }
    }

    return response;
  } catch (err) {
    console.error("Middleware error:", err);
    return NextResponse.error();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
