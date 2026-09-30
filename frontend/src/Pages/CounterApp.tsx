import { useEffect, useState } from "react";
import Counters from "../components/Counters.tsx";
import ProfileCard from "../components/ProfileCard.tsx";
import api from "../api/axios.ts";
interface CounterObject {
  id: number | string;
  value: number;
}

const defaultCounters = [
  { id: 1, value: 0 },
  { id: 2, value: 0 },
  { id: 3, value: 0 },
  { id: 4, value: 0 },
];
const CounterApp = () => {
  const token = localStorage.getItem("token");

  const [counters, setCounters] = useState<CounterObject[]>(defaultCounters);

  const loadCounters = async () => {
    try {
      const response = await api.get("/counter");
      const countersDB = response.data.counters.map((counter: any) => ({
        id: counter._id,
        value: counter.value,
      }));

      setCounters(countersDB);
    } catch (error) {
      console.error("Error loading counters:", error);
    }
  };
  useEffect(() => {
    loadCounters();
  }, []);

  const handleIncrement = async (counter: CounterObject) => {
    if (!token) {
      setCounters((counters) =>
        counters.map((item) =>
          item.id === counter.id ? { ...item, value: item.value + 1 } : item,
        ),
      );
      return;
    }
    try {
      const response = await api.put(`/counter/increment/${counter.id}`);
      setCounters((counters) =>
        counters.map((item) =>
          item.id === counter.id
            ? {
                ...item,
                value: response.data.counter.value,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Error Incrementing Value");
    }
  };

  const handleDecrement = async (counter: CounterObject) => {
    if (!token) {
      setCounters((counters) =>
        counters.map((item) =>
          item.id === counter.id
            ? item.value > 0
              ? { ...item, value: item.value - 1 }
              : item
            : item,
        ),
      );
      return;
    }
    try {
      const response = await api.put(`/counter/decrement/${counter.id}`);
      setCounters((counters) =>
        counters.map((item) =>
          item.id === counter.id
            ? {
                ...item,
                value: response.data.counter.value,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Error Decrementing Value");
    }
  };

  const handleReset = () => {
    setCounters(
      counters.map((c) => ({
        ...c,
        value: 0,
      })),
    );
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to continue");
        return;
      }
      await api.post("/counter/add");

      const response = await api.get("/counter");
      const counters = response.data.counters.map((count: any) => ({
        id: count._id,
        value: count.value,
      }));

      setCounters(counters);
    } catch (error: any) {
      console.error("Error adding counter:", error);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await api.delete(`/counter/${id}`);

      setCounters((prevCounters) =>
        prevCounters.filter((counter) => counter.id !== id),
      );
    } catch (error: any) {
      console.error("Error deleting counter:", error);

      if (error.response?.status === 401) {
        alert("Please login to continue");
      }
    }
  };

  return (
    <>
      <h1 className="mt-5 sm:mt-6 mb-4 px-4 text-2xl sm:text-3xl font-bold text-center">
        Counter App
        <span className="ml-2 px-2.5 py-0.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-full">
          {counters.filter((c) => c.value > 0).length}
        </span>
      </h1>

      <main className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        <Counters
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onDelete={handleDelete}
          onReset={handleReset}
          addCounter={handleAdd}
          counters={counters}
        />
        {!token ? <ProfileCard /> : <div></div>}
      </main>
    </>
  );
};

export default CounterApp;
