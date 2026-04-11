'use server'

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; // ใช้สำหรับ hash รหัสผ่าน
import { signupSchema } from "./zod";
import { cookies } from "next/headers"; // สร้าง session ว่า user login แล้ว




export async function signup(data) {
    const result = signupSchema.safeParse(data);

    if (!result.success) return {
        success: false,
        message: "รูปแบบข้อมูลไม่ถูกต้อง",
        errors: result.error.flatten().fieldErrors
    }
    

    // นำข้อมูลที่ถูกต้องแล้วมาใช้
    const { username, password, email, first_name, last_name, phone } = result.data;

    const existing_user = await prisma.profile.findFirst({
        where: {
            OR: [
                { "username" :username },
                { "email" :email }
            ]
        }
    })

    if (existing_user) return {success: false, message: "มีบัญชีผู้ใช้นี้แล้ว"}
        
    const hash_password = await bcrypt.hash(password, 10);

    const save_user = await prisma.profile.create({
        data: {
            username,
            password: hash_password,
            email,
            first_name,
            last_name,
            phone
        }
    })
}
