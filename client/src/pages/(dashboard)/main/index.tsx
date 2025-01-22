import { SideBarItems } from "@/components/shared/DashboardSidebar";
import { Link } from "react-router-dom";

const DashboardMainPage = () => {
  return (
    <>
      <h2 className="text-primary font-bold text-2xl py-6 ">
        Dashboard Main Page
      </h2>
      {SideBarItems.map((item) => (
        <Link to={item.url} key={item.url}>
          <div className="flex items-center justify-center h-16 m-2 border ">
            <item.icon className="w-6 h-6 mr-2" />
            <span>{item.title}</span>
          </div>
        </Link>
      ))}
    </>
  );
};

export default DashboardMainPage;
