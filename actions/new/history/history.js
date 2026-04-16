"use server";
import { getSessionUserId } from "@/lib/get-user-id";
import { prisma } from "@/lib/prisma";

export async function getHistory(page = 1, limit = 8) {
	try {
		const userId = await getSessionUserId();

		if (!userId) {
			return { status: 400, message: "ไม่พบผู้ใช้งาน" };
		}

		const skip = (page - 1) * limit;

		const [history, total] = await Promise.all([
			prisma.transaction.findMany({
				where: {
					userId: userId,
				},
				orderBy: {
					createdAt: "desc",
				},
				skip,
				take: limit,
			}),
			prisma.transaction.count({
				where: {
					userId: userId,
				},
			}),
		]);

		const convert_type = history.map((item) => ({
			...item,
			amount: Number(item.amount),
		}));

		return {
			status: 200,
			data: convert_type,
			pagination: {
				total,
				totalPages: Math.ceil(total / limit),
				currentPage: page,
			},
		};
	} catch {
		return { status: 500, message: "เกิดข้อผิดพลาดในการดึงประวัติการทำรายการ" };
	}
}
