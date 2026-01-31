import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";

function Dashboard() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      const res = await axios.get("https://alert-slots-app.onrender.com/alerts");
      console.log(res);
      
      setSlots(res.data.data);
    };
    fetchSlots();
  }, []);

  const addSlot = (newSlot) => {
    setSlots((prev) => [...prev, newSlot]);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://alert-slots-app.onrender.com/alerts/${id}`);
    setSlots((prev) => prev.filter((slot) => slot._id !== id));
  };

  const handleStatusClick = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Active"
        ? "Booked"
        : currentStatus === "Booked"
          ? "Expired"
          : "Active";

    await axios.put(`https://alert-slots-app.onrender.com/alerts/${id}`, {
      status: newStatus,
    });

    setSlots((prev) =>
      prev.map((slot) =>
        slot._id === id ? { ...slot, status: newStatus } : slot
      )
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold ml-20 mt-5">VisaSlot App</h2>

      <Form addSlot={addSlot} />

      <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4 
      gap-6 
      px-4

      mt-5
      ">
        {slots.map((slot) => (
          <div
            key={slot._id}
            className="border rounded-lg p-4 shadow-md bg-white relative"
          >
            <button
              onClick={() => handleDelete(slot._id)}
              className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
            >
              Delete
            </button>

            <p className="font-semibold text-lg">{slot.country}</p>
            <p className="text-gray-600">{slot.city}</p>

            <p className="text-sm mt-1">
              Visa Type: <b>{slot.visaType}</b>
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium">Status</span>

              <button
                onClick={() => handleStatusClick(slot._id, slot.status)}
                className={`px-3 py-1 rounded text-white text-xs cursor-pointer
            ${slot.status === "Active"
                    ? "bg-green-500"
                    : slot.status === "Booked"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  }
          `}
              >
                {slot.status}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;
