import mongoose from 'mongoose'

const alertSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    visaType: {
        type: String,
        enum: ["Student", "Tourist", "Business"],
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Book", "Expired"],
        default: "Active"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Alert = mongoose.model("Alert", alertSchema);
export default Alert;