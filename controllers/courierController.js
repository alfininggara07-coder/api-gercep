import hash from "bcrypt";
import Courier from "../models/Courier.js";
import Delivery from "../models/Delivery.js";

export const handleCourierLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Email and password are required",
      });
    }

    const courier = await Courier.findOne({ email });
    if (!courier) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Courier not found",
      });
    }
    const isPasswordValid = await hash.compare(password, courier.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Invalid password",
      });
    }
    return res.status(200).json({
      code: 200,
      success: true,
      courier: {
        _id: courier._id,
        name: courier.name,
        photo: courier.photo,
        email: courier.email,
        whatsapp: courier.whatsapp,
        no_kendaraan: courier.no_kendaraan,
      },
      message: "Courier login successful",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleCourierInfo = async (req, res) => {
  try {
    let averageRating = 0;
    const { id } = req.query;
    const courier = await Courier.findById(id);
    if (!courier) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Courier not found",
      });
    }
    const ratingData = await Delivery.findOne({
      $and: [{ "courier.courierId": id }],
    });
    if (ratingData && ratingData.courier[0].ulasan.rating) {
      averageRating = ratingData.courier[0].ulasan.rating;
    }
    return res.status(200).json({
      code: 200,
      success: true,
      courier: {
        _id: courier._id,
        name: courier.name,
        photo: courier.photo,
        alamat: courier.alamat,
        email: courier.email,
        whatsapp: courier.whatsapp,
        rating: averageRating,
        ulasan: courier.ulasan,
        no_kendaraan: courier.no_kendaraan,
      },
      message: "Courier info retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, success: false, message: "Internal server error" });
  }
};

export const handleCourierRating = async (req, res) => {
  try {
    const { courierId, user, rating, coment } = req.body;
    const courier = await Courier.findById(courierId);
    const isDuplicate = courier.ulasan.find((elem) => elem.user === user);
    if (isDuplicate) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "You have already rated this courier",
      });
    } else if (!courier) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Courier not found",
      });
    } else {
      const deliverys = await Delivery.find({
        $and: [{ "courier.courierId": courierId }],
      });
      deliverys.forEach(async (elem) => {
        elem.courier[0].ulasan.rating =
          (elem.courier[0].ulasan.rating * elem.courier[0].ulasan.totalRating +
            rating) /
          (elem.courier[0].ulasan.totalRating + 1);
        elem.courier[0].ulasan.totalRating =
          elem.courier[0].ulasan.totalRating + 1;
        await Delivery.updateOne(
          { _id: elem._id },
          { $set: { courier: elem.courier } }
        );
      });
      courier.ulasan.push({ user: user, rating: rating, comment: coment });
      await courier.save();
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Rating submitted successfully",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, success: false, message: "Internal server error" });
  }
};

export const handleCourierStatistik = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await Delivery.find({
      $and: [{ "courier.courierId": id }, { "status.3.available": true }],
    });
    let totalPrice = 0;
    let totalTime = 0;
    if (!data) {
      return res.status(404).json({
        code: 404,
        success: false,
        totalTime,
        totalPrice,
        totalFinish: data.length,
        message: "Data not found",
      });
    } else {
      data.forEach((elem) => {
        totalTime = totalTime + elem.time;
        totalPrice = totalPrice + elem.price;
      });
      return res.status(200).json({
        code: 200,
        success: true,
        totalTime,
        totalPrice,
        totalFinish: data.length,
        message: "Data found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
