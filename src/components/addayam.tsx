"use client";

import { useState } from "react";
import React from "react";
import AyamPart from "./ayampart";
import AyamRating from "./ayamrating";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddAyam({ onLogAdded }: { onLogAdded: () => void }) {
  const router = useRouter();

  const [partData, setPartData] = useState<number | null>(null);
  const [ratingData, setRatingData] = useState<number>(1);
  const [notesData, setNotesData] = useState<string>("");

  // Handle data from both AyamPart and AyamRating
  function handleDataFromChild(data: { part?: number; rating?: number }) {
    if (data.part !== undefined) setPartData(data.part);
    if (data.rating !== undefined) setRatingData(data.rating);
  }

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotesData(event.target.value);
  };

  const handleSubmit = async () => {
    if (partData === null) {
      toast.error("Please select an ayam part!");
      return;
    }

    try {
      const response = await fetch("/api/ayam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          part: partData,
          rating: ratingData,
          notes: notesData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add ayam log.");
      }

      toast.success("Successfully added ayam log!");
      onLogAdded();
      router.refresh(); // ✅ Ensure this triggers a re-fetch
      handleCloseDialog();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCloseDialog = () => {
    const dialog = document.getElementById("my_modal_5") as HTMLDialogElement;
    dialog.close();
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add an ayam</h3>
        <form
          className="card-body"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <AyamPart
            sendToParent={(part: number) => handleDataFromChild({ part })}
          />
          <AyamRating
            sendToParent={(rating: number) => handleDataFromChild({ rating })}
          />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Notes</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="What's up with this ayam?"
              value={notesData}
              onChange={handleNotesChange}
            ></textarea>
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleCloseDialog}>
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={partData === null}
            >
              Add Ayam
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
