import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const [graphData, setGraphData] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    availableDoctors: 0,
    patientsTreated: 0,
  });
  const [filterType, setFilterType] = useState("monthly");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/admin/stats");
        setStats(response.data);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      }
    };

    const fetchGraphData = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/admin/${filterType}-appointments`);
        setGraphData(res.data);
      } catch (err) {
        console.error("Error fetching graph data:", err);
      }
    };
    fetchStats();
    fetchGraphData();
  }, [filterType]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 shadow-xl bg-white text-center rounded-xl border border-gray-200 hover:shadow-2xl transition">
          <h2 className="text-lg font-semibold text-gray-700">Total Appointments</h2>
          <p className="text-3xl font-bold text-blue-500">{stats.totalAppointments}</p>
        </div>

        <div className="p-6 shadow-xl bg-white text-center rounded-xl border border-gray-200 hover:shadow-2xl transition">
          <h2 className="text-lg font-semibold text-gray-700">Doctors Available</h2>
          <p className="text-3xl font-bold text-green-500">{stats.availableDoctors}</p>
        </div>

        <div className="p-6 shadow-xl bg-white text-center rounded-xl border border-gray-200 hover:shadow-2xl transition">
          <h2 className="text-lg font-semibold text-gray-700">Patients Treated</h2>
          <p className="text-3xl font-bold text-red-500">{stats.patientsTreated}</p>
        </div>
      </div>

      <div className="mt-10 bg-white p-6 rounded-xl shadow-xl border border-gray-200 hover:shadow-2xl transition">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Appointments Overview</h2>
          <div className="relative inline-block text-left">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="appearance-none border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
              <option value="monthly">📅 Monthly</option>
              <option value="weekly">📆 Weekly</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
             <img src={assets.drop_down} alt="dropdown" className="w-4 h-4" />
            </div>
          </div>

        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={graphData}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Bar dataKey="appointments" fill="#4F46E5" barSize={50} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
