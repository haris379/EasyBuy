import Counter from "./Counter";

interface CounterObject {
  id: number | string;
  value: number;
}

interface CounterProps {
  counters: CounterObject[];
  onIncrement: (counter: CounterObject) => void;
  onDecrement: (counter: CounterObject) => void;
  onDelete: (id: number | string) => void;
  onReset: () => void;
  addCounter: () => void;
}

const Counters = ({
  counters,
  onIncrement,
  onDelete,
  onReset,
  onDecrement,
  addCounter,
}: CounterProps) => {
  return (
    <>
      <div className=" flex justify-center items-center">
        <button
          className="m-2 px-3 py-1.5 text-sm font-medium bg-[#800020] text-[#F3E6D5] rounded hover:bg-[#92284A] transition"
          onClick={onReset}
        >
          Reset
        </button>

        <button
          className="m-2 px-3 py-1.5 text-sm font-medium bg-[#800020] text-[#F3E6D5] hover:bg-[#92284A] rounded transition"
          onClick={addCounter}
        >
          Add Counter
        </button>
      </div>

      {counters.length === 0 ? (
        <p className="font-bold text-center m-2">No Counter</p>
      ) : (
        <div className=" flex justify-center items-center">
          <div>
            {counters.map((count: any) => (
              <Counter
                key={count.id}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onDelete={onDelete}
                count={count}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Counters;
