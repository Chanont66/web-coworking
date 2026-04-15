"use server";

import { prisma } from "@/lib/prisma";

export async function getRoom() {
	try {
		const res = await prisma.room.findMany({
			where: {
				isActive: true,
			},
			include: {
				roomType: true,
			},
		});
		return { status: 200, data: JSON.parse(JSON.stringify(res)) };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "เกิดข้อผิดพลาดในการดึงข้อมูลห้อง" };
	}
}


export async function getRoomById(roomId) {
	try {
		const res = await prisma.room.findUnique({
			where: {
				id: roomId,
			},
			include: {
				roomType: true,
			},
		});
		return { status: 200, data: JSON.parse(JSON.stringify(res)) };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "เกิดข้อผิดพลาดในการดึงข้อมูลห้อง" };
	}
}
