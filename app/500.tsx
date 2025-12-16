// app/500.tsx
export default function GlobalError() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Server Error</h1>
        <p className="text-gray-600">
          Something went wrong on our end. The team has been notified.
        </p>
      </div>
    </div>
  );
}
