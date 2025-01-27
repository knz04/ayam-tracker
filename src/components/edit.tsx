"use client";

import { AyamLog } from "@/lib/definitions";

export default function Edit() {
//   {
//   id,
//   part_name,
//   rating,
//   created_at, // or Date if it's a Date object
//   notes,
// }: AyamLog
  // const data = { id, part_name, rating, created_at, notes };

  const openModal = () => {
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div className="flex justify-center items-center my-3" onClick={openModal}>
      <button className="btn btn-sm btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="24"
          height="24"
          strokeWidth="1"
        >
          <path d="M4 7l16 0"></path>
          <path d="M10 11l0 6"></path>
          <path d="M14 11l0 6"></path>
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
        </svg>
      </button>

      <Dialog />
    </div>
  );
}

// async function handleDelete(id: number, e: React.FormEvent) {
//   e.preventDefault();
//   try {
//     const response = await fetch(`/api/ayam/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to delete the log");
//     }

//     // Handle success (maybe show a message or close the modal)
//     console.log("Successfully deleted");
//   } catch (error) {
//     console.error("Error deleting ayam log:", error);
//   }
// }

function Dialog() {
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete log</h3>
        <p className="py-4">Are you sure you want to delete?</p>
        <p className="text-xs italic">This feature will be added soon.</p>
        <div className="modal-action">
          <form
            method="dialog"
            className="space-x-2"
            // onSubmit={(e) => {
            //   handleDelete(id, e);
            //   const dialog = document.getElementById(
            //     "my_modal_5"
            //   ) as HTMLDialogElement;
            //   dialog.close();
            // }}
          >
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn"
              // onClick={() => {
              //   const dialog = document.getElementById(
              //     "my_modal_5"
              //   ) as HTMLDialogElement;
              //   dialog.close();
              // }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-error">
              Yes, delete
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
