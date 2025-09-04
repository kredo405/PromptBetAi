export const PromptModal = ({ prompt, visible, onOk }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-cyan-500/50 rounded-lg shadow-xl p-6 max-w-2xl w-full">
        <h3 className="text-cyan-400 text-xl font-semibold mb-4">Сгенерированный Промт</h3>
        <textarea
          readOnly
          rows={15}
          value={prompt}
          className="w-full pl-4 pr-4 py-2 bg-gray-800/70 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
        />
        <button
          onClick={onOk}
          className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};