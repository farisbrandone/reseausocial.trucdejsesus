import { formatDate } from "@/lib/formatDate";
import { MessageData } from "seedAndGetData/seedData";

export default function MessageCommunityElement({
  message,
}: {
  message: MessageData;
}) {
  return (
    <div className="flex items-center gap-2 max-h-[80px] bg-white shadow-xl px-2 py-1 w-full ">
      <div className="flex items-center justify-center w-[40px] h-[40px]">
        <img
          src={message.userAvatar}
          alt=""
          className="object-cover w-full h-full rounded-full"
        />
      </div>
      <div className="flex flex-col items-start flex-1">
        <p className="flex items-center justify-between w-full">
          <span>
            <strong>{message.userName}</strong>
          </span>
          <span> {formatDate(message.dateOfCreation as string)}</span>
        </p>
        <p className="h-[40px] overflow-hidden text-clip ">{message.text}</p>
      </div>
    </div>
  );
}
