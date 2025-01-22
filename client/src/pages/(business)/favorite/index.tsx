import InfiniteScroll from "react-infinite-scroll-component";

import { AvailabilityFilter } from "@/components/shared/availability-filter";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { RentCard } from "@/components/shared/rent-card";
import { RenderIf } from "@/components/shared/RenderIf";
import { LIST_TAKE_COUNT } from "@/constants";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Filters } from "../list/components/Filters";
import favoriteService from "@/services/favorite";
import { useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/store/auth";

export const FavoriteRentListPage = () => {
  const [searchParams] = useSearchParams();
  const dropOffLocation = searchParams.get("dropoff_location");
  const pickUpLocation = searchParams.get("pickup_location");
  const categories = searchParams.getAll("category");
  const capacities = searchParams.getAll("capacity");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const search = searchParams.get("search");

  const { favorites } = useAppSelector(selectAuth);
  console.log(favorites);

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.FAVORITE_RENT_LIST, searchParams.toString()],
    queryFn: ({ pageParam }) =>
      favoriteService.getAll({
        skip: pageParam,
        take: 3,
        dropOffLocation,
        pickUpLocation,
        categories,
        capacities,
        minPrice,
        maxPrice,
        search,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const hasMore =
        lastPage.data.count > lastPage.data.skip + lastPage.data.take;
      if (hasMore) {
        return lastPage.data.skip + lastPage.data.take;
      }
      return undefined;
    },
  });

  const rents =
    data?.pages.reduce(
      (prev, page) => [...prev, ...page.data.items],
      [] as any[]
    ) || [];

  return (
    <div className="grid xl:grid-cols-[360px,1fr] h-[100vh] overflow-y-auto">
      <ScrollToTop />
      <Filters fav={favorites} />
      <div className="bg-white hidden xl:block" />
      <div className="flex flex-col gap-y-6 lg:gap-y-8 pt-6 lg:pt-8 px-6 lg:px-8 pb-10">
        <AvailabilityFilter />
        <InfiniteScroll
          dataLength={rents.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <div className="flex flex-col items-center w-60 mx-auto gap-x-3 text-muted-foreground mt-4">
              <p>Scroll to load more items...</p>
            </div>
          }
          endMessage={
            <>
              <RenderIf condition={rents.length === 0}>
                <p className="mt-4 text-center text-muted-foreground">
                  No Favorite Rents Found
                </p>
              </RenderIf>
              {/* <RenderIf condition={false}>
                <p className="mt-4 text-center text-muted-foreground">
                  Loading more items...
                </p>
              </RenderIf> */}
            </>
          }
        >
          <div className="grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 ">
            <RenderIf condition={isLoading}>
              {[...Array(LIST_TAKE_COUNT)].map((_, index) => (
                <RentCard.Skeleton key={index} />
              ))}
            </RenderIf>

            {rents.map((rent) => (
              <RentCard key={rent._id} rent={rent} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default FavoriteRentListPage;
