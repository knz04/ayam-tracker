import { useState, useEffect } from "react";
import React from "react";
import AyamPart from "./ayampart";
import AyamRating from "./ayamrating";

export default function AddAyam() {
  const [partData, setPartData] = useState<number | null>(null); // Set initial partData to null
  const [ratingData, setRatingData] = useState<number>(1);
  const [notesData, setNotesData] = useState<string>("");

  // Handle data from both AyamPart and AyamRating
  function handleDataFromChild(data: { part?: number; rating?: number }) {
    if (data.part) {
      setPartData(data.part); // Set part data if part is passed
      console.log("Updated partData:", data.part); // Log updated part immediately
    }
    if (data.rating) {
      setRatingData(data.rating); // Set rating data if rating is passed
      console.log("Updated ratingData:", data.rating); // Log updated rating immediately
    }
  }

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotesData(event.target.value);
  };

  const handleSubmit = async (
    part: number | null,
    rating: number,
    notes: string
  ) => {
    if (part === null) {
      alert("Please select an ayam part!"); // Show alert if partData is null
      return;
    }

    console.log("Submitting data:", part, rating, notes);

    try {
      const response = await fetch("/api/ayam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ part, rating, notes }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Successfully added ayam log:", result);
      } else {
        const errorData = await response.json();
        console.error("Failed to add ayam log:", errorData.error);
      }
    } catch (error) {
      console.error("Error in submitting data:", error);
    }
  };

  useEffect(() => {
    console.log("Updated partData:", partData); // Log when partData changes
    console.log("Updated ratingData:", ratingData); // Log when ratingData changes
    console.log("Updated notesData:", notesData); // Log when notesData changes
  }, [partData, ratingData, notesData]);

  const handleCloseDialog = () => {
    const dialog = document.getElementById("my_modal_5") as HTMLDialogElement;
    dialog.close(); // Close the dialog
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add an ayam</h3>
        <form
          className="card-body"
          onSubmit={(event) => {
            event.preventDefault(); // Prevent default form submission
            handleSubmit(partData, ratingData, notesData); // Submit form data
            const dialog = document.getElementById(
              "my_modal_5"
            ) as HTMLDialogElement;
            dialog.close(); // Close the dialog after submission
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
            <button
              type="button"
              className="btn"
              onClick={handleCloseDialog} // Close the dialog when clicked
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={partData === null} // Disable submit button if partData is null
            >
              Add Ayam
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
