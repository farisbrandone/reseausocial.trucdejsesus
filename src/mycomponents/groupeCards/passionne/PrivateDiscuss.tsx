import { useContextReducer } from "@/hooks/useContextReducer";

import { Fragment } from "react";
import { Payment } from "./Columns";

export default function PrivateDiscuss({ row }: { row: Payment }) {
  const [state, _] = useContextReducer();
  const payment = row;
  console.log(payment.name);
  return (
    <Fragment>
      {state?.prev && (
        <div className="absolute top-[85px] right-2 px-2 py-1.5 flex flex-col gap-2 w-[180px] rounded-sm shadow-2xl z-50 bg-slate-50">
          <div
            /* onClick={() => navigator.clipboard.writeText(payment.name)} */
            className="hover:bg-black/30 cursor-pointer w-full py-1.5 pl-1 rounded-sm "
          >
            Membre info
          </div>

          <div className="hover:bg-black/30 cursor-pointer w-full py-1.5 pl-1 rounded-sm">
            Discuter en privée{" "}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export const Mycomponent = ({ row }: { row: Payment }) => {
  const [state, _] = useContextReducer();
  return (
    <div className="fixed z-[2000]">
      {state?.prev === row?.name && state.statePrev && (
        <PrivateDiscuss row={row as any} />
      )}
    </div>
  );
};
