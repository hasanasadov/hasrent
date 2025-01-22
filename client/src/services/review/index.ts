import axiosInstance from "../axiosInstance";
import { ChangeReviewStatusPayload, CreateReviewPayload } from "./type";

const getALL = async () => {
  return axiosInstance.get("/reviews");
};

const getByRentId = async ({ id }: { id: string }) => {
  return axiosInstance.get(`/reviews/${id}`);
};

const create = async (data: CreateReviewPayload) => {
  return axiosInstance.post("/reviews", data);
};

async function changeStatus({
  id,
  data,
}: {
  id: string;
  data: ChangeReviewStatusPayload;
}) {
  return await axiosInstance.put(`/reviews/change-status/${id}`, data);
}

const reviewService = {
  getALL,
  getByRentId,
  create,
  changeStatus,
};

export default reviewService;
