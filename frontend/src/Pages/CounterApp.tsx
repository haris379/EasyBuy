import { useEffect, useState } from "react";
import Counters from "../components/Counters.tsx";
import ProfileCard from "../components/ProfileCard.tsx";
import api from "../api/axios.ts";
import LoadingBar from "../components/LoadingBar.tsx";
interface CounterObject {
  id: number | string;
  value: number;
}
const guestCounters = [
  { id: 1, value: 0 },
  { id: 2, value: 0 },
  { id: 3, value: 0 },
  { id: 4, value: 0 },
];
const CounterApp = () => {
  const token = localStorage.getItem("token");
  const [counters, setCounters] = useState<CounterObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCounters = async () => {
      if (!token) {
        setCounters(guestCounters);
        setLoading(false);
        return;
      }
      try {
        const response = await api.get("/counter");
        const countersDB = response.data.counters.map((counter: any) => ({
          id: counter._id,
          value: counter.value,
        }));

        setCounters(countersDB);
      } catch (error) {
        console.error("Error loading counters:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCounters();
  }, [token]);

  const handleIncrement = async (counter: CounterObject) => {
    const previouCounters = [...counters];
    const updatedCounters = counters.map((count) => {
      if (count.id === counter.id) {
        return {
          ...count,
          value: count.value + 1,
        };
      }
      return count;
    });
    setCounters(updatedCounters);
    try {
      await api.put(`/counter/increment/${counter.id}`);
    } catch (error) {
      setCounters(previouCounters);
      console.error("Error Incrementing Value");
    }
  };

  const handleDecrement = async (counter: CounterObject) => {
    const previouCounters = [...counters];
    const updatedCounters = counters.map((count) => {
      if (count.id === counter.id) {
        return {
          ...count,
          value: Math.max(0, count.value - 1),
        };
      }
      return count;
    });
    setCounters(updatedCounters);
    try {
      await api.put(`/counter/decrement/${counter.id}`);
    } catch (error) {
      setCounters(previouCounters);
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
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to continue");
      return;
    }

    const temporaryCounter: CounterObject = {
      id: `temp-${Date.now()}`,
      value: 0,
    };

    setCounters((prevCounters) => [...prevCounters, temporaryCounter]);

    try {
      const response = await api.post("/counter/add");
      const newCounter = response.data.counter;

      if (newCounter) {
        setCounters((prevCounters) =>
          prevCounters.map((counter) =>
            counter.id === temporaryCounter.id
              ? {
                  id: newCounter._id,
                  value: newCounter.value,
                }
              : counter,
          ),
        );
      }
    } catch (error: any) {
      setCounters((prevCounters) =>
        prevCounters.filter((counter) => counter.id !== temporaryCounter.id),
      );

      console.error("Error adding counter:", error);
    }
  };
  const handleDelete = async (id: string | number) => {
    const previouCounters = [...counters];
    const updatedCounters = counters.filter((count) => {
      return count.id !== id;
    });
    setCounters(updatedCounters);
    try {
      await api.delete(`/counter/${id}`);
    } catch (error: any) {
      setCounters(previouCounters);
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
        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingBar />
          </div>
        ) : (
          <Counters
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onDelete={handleDelete}
            onReset={handleReset}
            addCounter={handleAdd}
            counters={counters}
          />
        )}
        {!token ? <ProfileCard /> : <div></div>}
      </main>
    </>
  );
};

export default CounterApp;
