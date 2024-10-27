import { Button } from "@/lib/components/Button";
import { DatePicker } from "@/lib/components/DatePicker";
import { joinClasses, songSelectionsToCSV } from "@/lib/helpers";
import { useSongSelections } from "@/lib/hooks/useSongSelections";
import { useState } from "react";

export interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportsModal: React.FC<ReportsModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Local State
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const validDates = startDate && endDate && startDate < endDate;

  // Data Fetching
  const { data: songSelectionsData, isFetching: isFetchingSongSelections } =
    useSongSelections();
  const songSelections = songSelectionsData?.songSelections ?? [];

  // Methods
  const submit = () => {
    // If dates are invalid, do not proceed
    if (!validDates) return;

    // Filter song selections based on date range
    const filteredSelections = songSelections.filter((selection) => {
      const selectionDate = selection.selectionDate;
      return selectionDate >= startDate && selectionDate <= endDate;
    });

    // Convert to CSV
    const csv = songSelectionsToCSV(filteredSelections);

    // Download CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `song_selections-${new Date().toISOString()}.csv`
    );
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    onClose();
  };

  if (!isOpen) return null;
  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-zinc-900 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <div className="flex flex-col relative min-h-[400px] transform rounded bg-zinc-950 border border-zinc-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-zinc-950 px-4 pb-4 pt-5">
                <div className="sm:flex sm:items-start">
                  <div className="flex flex-col mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <h3
                      className="text-lg mb-3 font-semibold leading-6 text-white"
                      id="modal-title"
                    >
                      Generate a Report
                    </h3>
                    <div className="mt-2 pb-4 border-b border-zinc-700 w-full">
                      <p className="text-sm text-gray-200">
                        Download a CSV file containing the history of song
                        selections
                      </p>
                    </div>
                    <div className="mt-3">
                      <div>
                        <label
                          htmlFor="start-date"
                          className="block text-sm font-medium text-neutral-400"
                        >
                          Start Date
                        </label>
                        <DatePicker
                          id="start-date"
                          placement="right"
                          value={startDate}
                          onChange={(d) => setStartDate(d)}
                          error={!validDates}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div>
                        <label
                          htmlFor="end-date"
                          className="block text-sm font-medium text-neutral-400"
                        >
                          End Date
                        </label>
                        <DatePicker
                          id="end-date"
                          placement="right"
                          value={endDate}
                          onChange={(d) => setEndDate(d)}
                          error={!validDates}
                        />
                      </div>
                    </div>

                    <div
                      className={joinClasses(
                        "mt-10 text-red-500",
                        validDates ? "opacity-0" : ""
                      )}
                    >
                      Dates must be valid and Start Date must be before End Date
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto flex bg-zinc-900 px-4 py-3 space-x-3 justify-end border-t border-zinc-700">
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={submit} disabled={!validDates}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
