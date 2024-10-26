import toast from "react-hot-toast";

export class BaseService {
  async get(params: Record<string, string>): Promise<any> {}
  async create(record: any): Promise<any> {}
  async update(record: any): Promise<any> {}
  async delete(recordId: string) {}

  error(error: any) {
    console.error(error);
    toast.error("An error occurred. Please try again later.");
  }
}
