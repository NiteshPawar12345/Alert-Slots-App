import Alert from "../models/Alerts.js";



export const getAlerts = async (req, res, next) => {
  try{
    let alerts = await Alert.find();
    console.log(alerts)
    res.status(200).json({
      success: true,
      message: "All Alerts",
      data: alerts
    })
  }catch(err) {
    next(err)
  }
}

export const createAlert = async (req, res, next) => {
  try {
    const { country, city, visaType, status } = req.body;

    const alert = await Alert.create({
      country,
      city,
      visaType,
      status
    });

    res.status(201).json({
      success: true,
      message: "Alert created successfully",
      data: alert
    });
  } catch (error) {
    next(error);
  }
};


export const updateAlert = async (req, res, next) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.status(200).json({
      success: true,
      message: "Alert updated",
      data: alert
    });
  } catch (error) {
    next(error);
  }
};


export const deleteAlert = async (req, res, next) => {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id);

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.status(200).json({
      success: true,
      message: "Alert deleted"
    });
  } catch (error) {
    next(error);
  }
};
