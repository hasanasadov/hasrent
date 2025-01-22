import { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartData } from "chart.js";
import { Location, Rent } from "@/types";

// Register necessary components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const RentPolarAreaChart = ({
  rents,
  locations,
  className,
  content,
}: {
  rents: Rent[];
  locations: Location[];
  className?: string;
  content: string;
}) => {
  const [chartData, setChartData] = useState<ChartData<"polarArea"> | null>(
    null
  );

  useEffect(() => {
    const filteredLocations = locations.filter((location) =>
      rents.some((rent) =>
        rent.dropOffLocations.map((loc) => loc._id).includes(location._id)
      )
    );

    const labels = filteredLocations.map((location) => location.title);
    const prices = filteredLocations.map((location) => {
      const locationRents = rents.filter((rent) =>
        rent.dropOffLocations.map((loc) => loc._id).includes(location._id)
      );
      const total = locationRents.reduce(
        (sum, rent) => sum + (rent.discountPrice || rent.price),
        0
      );
      return locationRents.length ? total / locationRents.length : 0;
    });

    const colors = filteredLocations.map(
      () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.6)`
    );

    setChartData({
      labels,
      datasets: [
        {
          label: "Average Rent Price by DropOff Location",
          data: prices,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("0.6", "1")),
          borderWidth: 1,
        },
      ],
    });
  }, [rents, locations]);

  return (
    <div
      className={`${className} flex flex-col gap-4 items-center justify-center`}
    >
      {chartData ? (
        <PolarArea
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: "top" },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
      <span>{content}</span>
    </div>
  );
};

export default RentPolarAreaChart;
