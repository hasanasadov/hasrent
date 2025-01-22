import { Request, Response } from "express";
import User from "../mongoose/schemas/user";
import { RootFilterQuery } from "mongoose";
import Rent from "../mongoose/schemas/rent";

const getAllWOPagination = async (req: Request, res: Response) => {
  const user = req.user;

  res.status(200).json({
    favorites: user?.favorites,
    message: "Favorites fetched successfully!",
  });
};

const getAll = async (req: Request, res: Response) => {
  try {
    const {
      search,
      dropOffLocation,
      pickUpLocation,
      minPrice,
      maxPrice,
      categories,
      capacities,
      skip = 0,
      take = 10,
      showInRecommendation,
    } = req.matchedData;

    const user = req.user;

    const userFavorites = user?.favorites;

    const filter: RootFilterQuery<any> = {
      $or: [],
      $and: [
        {
          _id: { $in: userFavorites },
        },
      ],
    };

    if (showInRecommendation) {
      filter.$and?.push({
        showInRecommendation: showInRecommendation === "true",
      });
    }

    if (search) {
      filter.$or?.push({
        title: { $regex: search as string, $options: "i" },
      });
      filter.$or?.push({
        description: { $regex: search as string, $options: "i" },
      });
    }

    if (dropOffLocation) {
      filter.$and?.push({
        dropOffLocations: {
          $in: [dropOffLocation],
        },
      });
    }

    if (pickUpLocation) {
      filter.$and?.push({
        pickUpLocations: {
          $in: [pickUpLocation],
        },
      });
    }

    if (capacities?.length) {
      filter.$and?.push({
        capacity: { $in: capacities },
      });
    }

    if (categories?.length) {
      filter.$and?.push({
        category: { $in: categories },
      });
    }

    if (minPrice) {
      filter.$and?.push({
        price: { $gte: minPrice },
      });
    }

    if (maxPrice) {
      filter.$and?.push({
        price: { $lte: maxPrice },
      });
    }

    const rents = await Rent.find(filter)
      .populate(["category", "pickUpLocations", "dropOffLocations"])
      .skip(+skip)
      .limit(+take);

    const count = await Rent.countDocuments(filter);

    res.status(200).json({
      message: "Favorite Rents fetched successfully!",
      skip: +skip,
      take: +take,
      count,
      items: rents.map((rent) => ({
        ...rent.toObject(),
        imageUrls: rent.imageUrls.map((url) => `${process.env.BASE_URL}${url}`),
      })),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const toggle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (user?.favorites.includes(id)) {
      Array.from(user?.favorites).forEach((favorite, index) => {
        if (favorite === id) {
          user?.favorites.splice(index, 1);
        }
      });
    } else {
      user?.favorites.push(id);
    }

    await User.findByIdAndUpdate(user?._id, { favorites: user?.favorites });

    res.json({ message: "Favorited" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const favoriteController = {
  getAllWOPagination,
  getAll,
  toggle,
};

export default favoriteController;
