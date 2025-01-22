import { RentList } from "../../../components/shared/RentList";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import rentService from "@/services/rent";
import RentBarChart from "@/pages/(business)/chart/components/BarChart";
import categoryService from "@/services/category";
import { useEffect, useState } from "react";
import { Category, Location, Rent } from "@/types";
import locationService from "@/services/location";
import RentPieChart from "@/pages/(business)/chart/components/PieChart";
import RentPolarAreaChart from "@/pages/(business)/chart/components/PolarAreaChart";
import RentDoughNutChart from "@/pages/(business)/chart/components/DoughNutChart";

const HomePage = () => {
  const [rents, setRents] = useState<Rent[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const { data: rentData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.RENT_LIST],
    queryFn: () => rentService.getAll(),
  });

  const { data: categoryData } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: () => categoryService.getAll(),
  });

  const { data: locationData } = useQuery({
    queryKey: [QUERY_KEYS.LOCATIONS],
    queryFn: () => locationService.getAll(),
  });

  useEffect(() => {
    setRents(rentData?.data?.items || []);
    setCategories(categoryData?.data?.items || []);
    setLocations(locationData?.data?.items || []);
  }, [rentData, categoryData]);

  return (
    <div className="container pt-4 lg:pt-8 pb-8 lg:pb-16 flex flex-col gap-y-6 lg:gap-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 p-4">
        <RentBarChart className="h-max" rents={rents} categories={categories} />
        <RentPieChart
          rents={rents}
          locations={locations}
          content="Average Price by PickUp Location"
        />
        <RentPolarAreaChart
          rents={rents}
          locations={locations}
          content="Average Price by DropOff Location"
        />
        <RentDoughNutChart
          rents={rents}
          locations={locations}
          content="Rent Count by Pickup Location"
        />
      </div>
      <RentList heading="Rental Cars" isLoading={isLoading} rents={rents} />
    </div>
  );
};

export default HomePage;
