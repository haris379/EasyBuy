import { Link } from "react-router-dom";

const OrderPlaced = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#800020]">
          <svg
            className="h-10 w-10 text-[#F3E6D5]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="mb-8 text-gray-600">
          Thank you for your order. We’ve received your order and will start
          processing it shortly.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="rounded-lg bg-[#800020] px-6 py-3 font-medium text-[#F3E6D5] transition hover:bg-green-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
