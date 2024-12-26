"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Mailer {
  id: number;
  name: string;
}

interface List {
  id: number;
  name: string;
}

export default function MailingScheduler() {
  const [mailers, setMailers] = useState<Mailer[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [selectedMailer, setSelectedMailer] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [schedule, setSchedule] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mailersRes, listsRes] = await Promise.all([
          axios.get<Mailer[]>("/api/mailers"),
          axios.get<List[]>("/api/lists"),
        ]);
        setMailers(mailersRes.data);
        setLists(listsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/mailing", {
        mailerId: selectedMailer,
        listId: selectedList,
        schedule,
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error creating mailing:", error);
      setMessage("Failed to create mailing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <div className='bg-white p-6 rounded shadow-lg w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Schedule a Mailing</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-700 mb-2'>Select Mailer</label>
            <select
              value={selectedMailer}
              onChange={(e) => setSelectedMailer(e.target.value)}
              className='w-full p-2 border rounded'
              required
            >
              <option value=''>Choose a Mailer</option>
              {mailers.map((mailer) => (
                <option key={mailer.id} value={mailer.id}>
                  {mailer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-gray-700 mb-2'>Select List</label>
            <select
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              className='w-full p-2 border rounded'
              required
            >
              <option value=''>Choose a List</option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-gray-700 mb-2'>Schedule</label>
            <DatePicker
              selected={schedule}
              onChange={(date) => setSchedule(date)}
              showTimeSelect
              dateFormat='Pp'
              className='w-full p-2 border rounded'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
            disabled={loading}
          >
            {loading ? "Scheduling..." : "Schedule Mailing"}
          </button>
        </form>

        {message && (
          <p className='mt-4 text-center text-green-600'>{message}</p>
        )}
      </div>
    </div>
  );
}
