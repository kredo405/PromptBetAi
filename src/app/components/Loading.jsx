

export const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900/80 backdrop-blur-sm">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400 mx-auto"></div>
        <span className="block font-sans text-2xl font-semibold text-white mt-4 tracking-wider">
          Загрузка...
        </span>
      </div>
    </div>
  );
};