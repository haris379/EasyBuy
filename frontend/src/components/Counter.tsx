interface CounterObject {
  id: number | string;
  value: number;
}

interface CounterProps {
  count: CounterObject;
  onIncrement: (counter: CounterObject) => void;
  onDecrement: (counter: CounterObject) => void;
  onDelete: (id: number | string) => void;
}

const Counter = ({
  count,
  onIncrement,
  onDelete,
  onDecrement,
}: CounterProps) => {
  const formatCount = () => {
    return count.value === 0 ? "Zero" : count.value;
  };

  const getClasses = (): string => {
    return count.value === 0
      ? "bg-[#F3E6D5] text-[#800020]"
      : "bg-[#800020] text-[#F3E6D5]";
  };

  return (
    <div className="flex flex-row items-center mb-3 gap-2">
      <button
        className="m-2 px-3 py-1.5 text-sm font-medium text-white bg-gray-600 rounded hover:bg-gray-700 transition"
        onClick={() => onDecrement(count)}
      >
        Decrement
      </button>

      <span
        className={`min-w-15 text-center px-3 py-1 text-sm font-semibold rounded-full ${getClasses()}`}
      >
        {formatCount()}
      </span>

      <button
        className="m-2 px-3 py-1.5 text-sm font-medium text-white bg-gray-600 rounded hover:bg-gray-700 transition"
        onClick={() => onIncrement(count)}
      >
        Increment
      </button>

      <button
        className="m-2 px-3 py-1.5 text-sm font-medium  bg-[#800020] text-[#F3E6D5] hover:bg-[#92284A] rounded transition"
        onClick={() => onDelete(count.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Counter;
