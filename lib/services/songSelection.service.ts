import { BaseService } from "@/lib/services/base.service";
import { SongSelection } from "@/lib/types/SongSelection";
import toast from "react-hot-toast";

export class SongSelectionService extends BaseService {
  async get(): Promise<{ songSelections: SongSelection[] }> {
    const response = await fetch(`/api/song_selections`);
    const data = await response.json();
    return data;
  }

  async update(record: SongSelection): Promise<void> {
    try {
      const result = await fetch(`/api/song_selections`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (result.ok) {
        toast.success("Song selection updated");
        return;
      } else {
        toast.error("Failed to update song selection");
      }
    } catch (error) {
      this.error(error);
    }
  }

  async create(record: Omit<SongSelection, "_id">): Promise<void> {
    try {
      const result = await fetch(`/api/song_selections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (result.ok) {
        toast.success("Song selection saved");
        return;
      } else {
        toast.error("Failed to create song selection");
      }
    } catch (error) {
      this.error(error);
    }
  }
}

export const songSelectionService = new SongSelectionService();
