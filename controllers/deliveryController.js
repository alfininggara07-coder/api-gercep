import Delivery from "../models/Delivery.js";

export const updateDelivery = async (req, res) => {
  try {
    const { id, type, courier, courierId, photo, whatsapp, no_kendaraan } =
      req.body;
    const updateData1 = [
      {
        text: "Tunggu kurir",
        available: true,
      },
      {
        text: type == "Belanja" ? "Membeli" : "Mengambil",
        available: true,
      },
      {
        text: "Mengantar",
        available: false,
      },
      {
        text: "Sampai",
        available: false,
      },
    ];
    const updateData2 = [
      {
        courierId: courierId,
        courierName: courier,
        photo: photo,
        whatsapp: whatsapp,
        no_kendaraan: no_kendaraan,
        ulasan: {
          rating: 0,
          totalRating: 0,
        },
      },
    ];
    const updatedDelivery = await Delivery.updateOne(
      { _id: id },
      {
        $set: {
          status: updateData1,
          courier: updateData2,
        },
      }
    );
    if (updatedDelivery) {
      res.status(200).json({
        code: 200,
        success: true,
        message: "Delivery updated successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        success: false,
        message: "Delivery not found",
      });
    }
  } catch (error) {
    res.status(500).json({ code: 500, success: false, error: error.message });
  }
};

export const updateStatusDelivery = async (req, res) => {
  try {
    const { id, type, status } = req.query;
    let updateData = [];
    if (status == "Tunggu kurir"){
      updateData = [
        {
          text: "Tunggu kurir",
          available: true,
        },
        {
          text: type == "Belanja" ? "Membeli" : "Mengambil",
          available: true,
        },
        {
          text: "Mengantar",
          available: false,
        },
        {
          text: "Sampai",
          available: false,
        },
      ];
    }else if (status == "Mengambil" || status == "Membeli") {
      updateData = [
        {
          text: "Tunggu kurir",
          available: true,
        },
        {
          text: type == "Belanja" ? "Membeli" : "Mengambil",
          available: true,
        },
        {
          text: "Mengantar",
          available: true,
        },
        {
          text: "Sampai",
          available: false,
        },
      ];
    } else {
      updateData = [
        {
          text: "Tunggu kurir",
          available: true,
        },
        {
          text: type == "Belanja" ? "Membeli" : "Mengambil",
          available: true,
        },
        {
          text: "Mengantar",
          available: true,
        },
        {
          text: "Sampai",
          available: true,
        },
      ];
    }
    const updatedDelivery = await Delivery.updateOne(
      { _id: id },
      {
        $set: {
          status: updateData,
        },
      }
    );
    if (updatedDelivery) {
      if (status == "Mengantar") {
        res.status(200).json({
          code: 200,
          success: true,
          finished: true,
          updateData,
          message: "Delivery updated successfully",
        });
      } else {
        res.status(200).json({
          code: 200,
          success: true,
          updateData,
          message: "Delivery updated successfully",
        });
      }
    } else {
      res.status(404).json({
        code: 404,
        success: false,
        message: "Delivery not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      error: error.message,
    });
  }
};

export const requestDelivery = async (req, res) => {
  try {
    const {
      product,
      url,
      author,
      location1,
      location2,
      count,
      price,
      status,
      courier,
      type,
    } = req.body;
    const newDelivery = new Delivery({
      product,
      url,
      author,
      location1,
      location2,
      count,
      price,
      status,
      courier,
      type,
    });
    await newDelivery.save();
    res.status(200).json({
      code: 200,
      success: true,
      message: "Delivery request created successfully",
    });
  } catch (error) {
    res.status(500).json({ code: 500, success: false, error: error.message });
  }
};

export const getKipDelivery = async (req, res) => {
  try {
    const { courierId } = req.query;
    const deliverys = await Delivery.find({
      $and: [
        { "courier.courierId": courierId },
        { "status.3.available": false },
      ],
    });
    if (deliverys.length > 0) {
      res.status(200).json({
        code: 200,
        success: true,
        deliverys,
        message: "delivery requests found",
      });
    } else {
      res.status(404).json({
        code: 404,
        success: false,
        message: "No delivery requests found",
      });
    }
  } catch (error) {
    res.status(500).json({ code: 500, success: false, error: error.message });
  }
};

export const getRequestDelivery = async (req, res) => {
  try {
    const { author } = req.query;
    let finished = [];
    let unFinished = [];
    const deliverys = await Delivery.find({"author.user_id": author});
    if (deliverys.length > 0) {
      deliverys.forEach((elem) => {
        if (elem.status[3].available === true) {
          finished.push(elem);
        } else {
          unFinished.push(elem);
        }
      });
      finished.reverse();
      unFinished.reverse();
      res.status(200).json({
        code: 200,
        success: true,
        finished,
        unFinished,
        message: "delivery requests found",
      });
    } else {
      res.status(404).json({
        code: 404,
        success: false,
        finished,
        unFinished,
        message: "No delivery requests found",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      finished: [],
      unFinished: [],
      error: error.message,
    });
  }
};

export const getAllRequestDelivery = async (req, res) => {
  try {
    const { courierId } = req.query;
    const courier = {
      $or: [{ courier: [] }, { "courier.courierId": courierId }],
    };
    let finished = [];
    let unFinished = [];
    const deliverys = await Delivery.find(courier);
    if (deliverys.length > 0) {
      deliverys.forEach((elem) => {
        if (elem.status[3].available === true) {
          finished.push(elem);
        } else {
          unFinished.push(elem);
        }
      });
      finished.reverse();
      unFinished.reverse();
      res.status(200).json({
        code: 200,
        success: true,
        finished,
        unFinished,
        message: "All delivery requests found",
      });
    } else {
      res.status(404).json({
        code: 404,
        success: false,
        finished,
        unFinished,
        message: "No delivery requests found",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      finished: [],
      unFinished: [],
      error: error.message,
    });
  }
};

export const handleDeliveryCancle = async (req, res) => {
  try {
    const { id,author } = req.body;
    const deletedDelivery = await Delivery.deleteOne({
      $and: [
        { _Id: id },
        { author: author },
      ],
    });
    if (deletedDelivery.deletedCount) {
      res.status(200).json({
        code: 200,
        success: true,
        message: "Delivery request cancelled successfully",
      });
    } else {
      res.status(404).json({
        code: 404,
        success: false,
        message: "Delivery not found",
      });
    }
  } catch (error) {
    res.status(500).json({ code: 500, success: false, error: error.message });
  }
};





