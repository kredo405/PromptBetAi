export const ErrorModal = ({ message, visible, onOk }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-red-500/50 rounded-lg shadow-xl p-6 max-w-sm w-full">
        <h3 className="text-red-400 text-xl font-semibold mb-4">Ошибка</h3>
        <p className="text-white mb-6">{message}</p>
        <button
          onClick={onOk}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};