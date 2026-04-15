import MyFooter from "@/components/my-components/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/my-components/navbar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "coworking space",
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="flex flex-col min-h-screen">
					<Navbar />
					<main className="flex-1">{children}</main>

					<Toaster position="top-center" />
					<MyFooter />
				</div>
			</body>
		</html>
	);
}
