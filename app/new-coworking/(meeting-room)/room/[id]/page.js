import { getRoomById } from "@/actions/new/booking/get-room";
import { getTimeSlots } from "@/actions/new/booking/time-slots";
import RoomDetail from "@/components/my-components/room-detail";

export default async function RoomDetailPage(props) {
	const params = await props.params;
	const roomId = Number(params.id);

	const room = await getRoomById(roomId);
	const room_detail = room.data;

	if (!room_detail) {
		return <div className="p-10 text-center text-red-500">ไม่พบห้องประชุมนี้</div>;
	}

	const res = await getTimeSlots();
	const time_slots = res.data;

	return <RoomDetail roomInfo={room_detail} timeSlots={time_slots} />;
}
