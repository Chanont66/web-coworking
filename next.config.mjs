/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "i.pravatar.cc",
			},
			// url ของรูปที่อนุญาติให้ใช้ (ไม่งั้นมัน block)
			{
				protocol: "https",
				hostname: "uppic.cloud",
			},
			{
				protocol: "https",
				hostname: "travel.marumura.com",
			},
		],
	},
};

export default nextConfig;
