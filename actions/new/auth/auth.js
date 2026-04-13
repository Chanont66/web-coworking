"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { loginSchema, signupSchema } from "./zod";

export async function signup(data) {
	const result = signupSchema.safeParse(data);
	if (!result.success) {
		return {
			status: 400,
			message: "รูปแบบข้อมูลไม่ถูกต้อง",
			errors: result.error.flatten().fieldErrors,
		};
	}

	const { username, password, email, firstName, lastName, phone } = result.data;

	try {
		const existing_user = await prisma.profile.findFirst({
			where: { OR: [{ username }, { email }] },
		});

		if (existing_user) {
			if (existing_user.email === email) {
				return { status: 400, message: "อีเมลนี้ถูกใช้งานแล้ว", field: "email" };
			}
			return { status: 400, message: "ชื่อผู้ใช้นี้ถูกใช้งานแล้ว", field: "username" };
		}

		const hash_password = await bcrypt.hash(password, 10);

		await prisma.profile.create({
			data: {
				username,
				password: hash_password,
				email,
				firstName,
				lastName,
				phone,
			},
		});

		return { status: 200, message: "สมัครสมาชิกสำเร็จ" };
	} catch {
		return { status: 500, message: "เกิดข้อผิดพลาดในการสมัครสมาชิก" };
	}
}

export async function login(data) {
	const result = loginSchema.safeParse(data);
	if (!result.success) {
		return {
			status: 400,
			message: "รูปแบบข้อมูลไม่ถูกต้อง",
			errors: result.error.flatten().fieldErrors,
		};
	}

	const { username, password } = result.data;

	try {
		const find_user = await prisma.profile.findFirst({
			where: { username },
		});

		if (!find_user || !(await bcrypt.compare(password, find_user.password))) {
			return {
				status: 400,
				message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
			};
		}

		const session = await cookies();
		session.set("session", find_user.id, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 7, // 7 วัน
			path: "/",
		});

		return { status: 200, id: find_user.id };
	} catch {
		return { status: 500, message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" };
	}
}

export async function logout() {
	try {
		const session = await cookies();
		session.delete("session");
		return { status: 200, message: "ออกจากระบบสำเร็จ" };
	} catch {
		return { status: 500, message: "เกิดข้อผิดพลาดในการออกจากระบบ" };
	}
}
