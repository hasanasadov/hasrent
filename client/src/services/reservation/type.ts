import { Reservation, ReservationStatus } from "@/types";

export type CreateReservationPayload = {
  rent: string;
  pickUpDate: string;
  dropOffDate: string;
  billing: {
    name: string;
    phoneNumber: string;
    address: string;
    city: string;
  };
  pickUpLocation: string;
  dropOffLocation: string;
};

export type GetAllReservationsResponse = {
  items: Reservation[];
  message: string;
};

export type ChangeReservationStatusPayload = {
  status: ReservationStatus;
};
