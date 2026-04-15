import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getSessionUserId() {
	const session = await cookies();
	const token = session.get("session")?.value;

	if (!token) return null;

	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		const { payload } = await jwtVerify(token, secret);
		return payload.id; // จะคืนค่า User ID ที่เรายัดไว้กลับมาแบบปลอดภัย
	} catch {
		return null;
	}
}
