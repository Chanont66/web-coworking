import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const hasSession = request.cookies.has("session");
	const isLoginPage = pathname.startsWith("/new-coworking/login");

	if (!hasSession && !isLoginPage) {
		const loginUrl = new URL("/new-coworking/login", request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	if (hasSession && isLoginPage) {
		return NextResponse.redirect(new URL("/home", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/new-coworking/room/:path*",
		"/new-coworking/login",
		// "/coworking/:path*",
	],
};
