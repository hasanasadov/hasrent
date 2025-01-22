import { Link } from "react-router-dom";
import { paths } from "@/constants/paths";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/store/auth";
import noImage from "@/assets/images/noImage.png";

const ProfilePage = () => {
  const { user, loading } = useAppSelector(selectAuth);

  if (loading) {
    return <div className="text-center text-lg font-medium">Loading...</div>;
  }

  return (
    <div className="max-w-4xl bg-transparent mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

      <div className=" p-6 flex flex-col items-center rounded-lg shadow-md  ">
        <div className="flex items-center flex-col space-y-6 mb-6">
          <img
            src={user!.avatar || noImage}
            alt="A"
            className="w-64 h-64 rounded-full object-cover"
          />
          <div className="text-center flex flex-col items-center gap-3">
            <h2 className="text-xl font-medium">
              {user!.name} {user!.surname}
            </h2>
            <p className="text-gray-600">{user!.email}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button asChild>
            <Link to={paths.PROFILE.EDIT}>Edit</Link>
          </Button>
          <Button variant={"destructive"} asChild>
            <Link to={paths.PROFILE.DELETE}>Delete</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
