import { z } from "zod";

export const signupSchema = z
	.object({
		username: z
			.string()
			.trim()
			.min(3, "ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร")
			.max(20, "ชื่อผู้ใช้ต้องไม่เกิน 20 ตัวอักษร")
			.regex(/^[a-zA-Z0-9_]+$/, "ชื่อผู้ใช้ใช้ได้เฉพาะ a-z, A-Z, 0-9 และ _ เท่านั้น"),

		password: z
			.string()
			.min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
			.max(50, "รหัสผ่านยาวเกินไป")
			.regex(/[A-Z]/, "รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
			.regex(/[a-z]/, "รหัสผ่านต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว")
			.regex(/[0-9]/, "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว"),

		confirmPassword: z.string().min(1, "กรอกรหัสผ่านอีกครั้ง"),

		email: z.string().trim().email("รูปแบบอีเมลไม่ถูกต้อง"),

		firstName: z
			.string()
			.trim()
			.min(3, "ชื่อต้องมีอย่างน้อย 3 ตัวอักษร")
			.max(50, "ชื่อยาวเกินไป"),

		lastName: z
			.string()
			.trim()
			.min(3, "นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร")
			.max(50, "นามสกุลยาวเกินไป"),

		phone: z
			.string()
			.trim()
			.regex(/^[0-9]{10}$/, "เบอร์โทรต้องเป็นตัวเลข 10 หลักเท่านั้น"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "รหัสผ่านไม่ตรงกัน",
		path: ["confirmPassword"],
	});

export const loginSchema = z.object({
	username: z.string().trim().min(1, "กรุณากรอกชื่อผู้ใช้หรืออีเมล"),
	password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});
