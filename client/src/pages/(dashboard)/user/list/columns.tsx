import { RenderIf } from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import userService from "@/services/user";
import { selectAuth } from "@/store/auth";
import { User, UserRole } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: (data) => (
      <img
        src={data.row.original.avatar!}
        alt={"A"}
        className="w-8 h-8 rounded-full"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "surname",
    header: "Surname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  // {
  //   accessorKey: "role",
  //   header: "Role",
  //   cell: (data) => {
  //     switch (data.row.original.role) {
  //       case UserRole.Admin:
  //         return (
  //           <div className="text-green-500 capitalize">
  //             {data.row.original.role}
  //           </div>
  //         );
  //       case UserRole.User:
  //         return (
  //           <div className="text-yellow-500  capitalize">
  //             {data.row.original.role}
  //           </div>
  //         );
  //     }
  //   },
  // },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "actions",
    header: "Role Actions",
    cell: (data) => {
      const [role, setRole] = useState<UserRole>(data.row.original.role);
      const { user: loggedUser } = useAppSelector(selectAuth);

      return (
        <div className="text-primary flex items-center justify-center gap-4">
          {role === UserRole.Admin ? (
            <div className="text-green-500 capitalize">{role}</div>
          ) : (
            <div className="text-yellow-500 capitalize">{role}</div>
          )}
          <RenderIf condition={loggedUser?._id !== data.row.original._id}>
            <Button
              className={`px-4 py-2 ${
                role === UserRole.User ? "bg-red-800" : ""
              }`}
              onClick={() => {
                userService
                  .changeRole({ id: data.row.original._id })
                  .then(() => {
                    toast.success("User role changed successfully");
                    setRole(
                      role === UserRole.Admin ? UserRole.User : UserRole.Admin
                    );
                  });
              }}
            >
              Make {role === UserRole.Admin ? "User" : "Admin"}
            </Button>
          </RenderIf>
        </div>
      );
    },
  },
];
