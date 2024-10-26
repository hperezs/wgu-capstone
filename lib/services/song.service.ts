import { BaseService } from "@/lib/services/base.service";
import { Song } from "@/lib/types/Song";

export class SongService extends BaseService {
  async get(searchParams: {
    search: string;
    sortBy: string;
  }): Promise<{ songs: Song[] }> {
    try {
      const { search, sortBy } = searchParams;
      const response = await fetch(
        `/api/songs?search=${search}&sort=${sortBy}`
      );

      const data = await response.json();
      return data;
    } catch (error) {
      this.error(error);
      return { songs: [] };
    }
  }
}

export default new SongService();
