import React, { useState } from "react";
import axios from "axios";

function Form({ addSlot }) {
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    visaType: "Student",
    status: "Active",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.country || !formData.city) return;

    try {
      const res = await axios.post(
        "http://localhost:3001/alerts",
        formData
      );

      addSlot(res.data.data);

      setFormData({
        country: "",
        city: "",
        visaType: "Student",
        status: "Active",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-7 px-4">
  <form
    className="
      border 
      p-7 
      rounded 
      w-full 
      max-w-xl 
      mx-auto
    "
    onSubmit={handleSubmit}
  >
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        className="border w-full rounded h-10 px-3"
        name="country"
        type="text"
        placeholder="Enter Country"
        value={formData.country}
        onChange={handleInput}
        required
      />

      <input
        className="border w-full rounded h-10 px-3"
        name="city"
        type="text"
        placeholder="Enter City"
        value={formData.city}
        onChange={handleInput}
        required
      />
    </div>

    <br />

    <select
      name="visaType"
      className="border w-full rounded h-10 px-3"
      value={formData.visaType}
      onChange={handleInput}
    >
      <option value="Student">Student</option>
      <option value="Business">Business</option>
      <option value="Tourist">Tourist</option>
    </select>

    <br /><br />

    <button className="
      border 
      w-full 
      h-11 
      rounded 
      bg-blue-500 
      text-white 
      hover:bg-blue-700 
      transition
      cursor-pointer
    ">
      Create Alert
    </button>
  </form>
</div>

  );
}

export default Form;
