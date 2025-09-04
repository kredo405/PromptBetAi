import { CustomCard } from "./CustomCard";

export const TeamCard = ({ team, logo, name, onInputChange, values }) => (
    <div className="relative group">
        {/* Эффект свечения при наведении */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition-all duration-300 group-hover:duration-500"></div>
        
        <CustomCard title={name}>
            <div className="flex flex-col items-center text-white">
                {/* Аватар команды с эффектом свечения */}
                <div className="relative mb-4">
                    <div className="absolute -inset-2 bg-cyan-500/30 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                    <img
                        className="relative w-24 h-24 object-contain bg-gray-800 p-2 rounded-full shadow-lg z-10 border border-cyan-400/20"
                        src={logo}
                        alt={name}
                    />
                </div>

                <div className="w-full space-y-4">
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                        <input
                            type="text"
                            placeholder="Рейтинг команды"
                            value={values[`rate${team}`]}
                            onChange={(e) => onInputChange(`rate${team}`, e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-800/70 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-3 h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.734V6a2 2 0 012-2h2.5" /></svg>
                        <textarea
                            rows={2}
                            placeholder="Сильные стороны"
                            value={values[`strengths${team}`]}
                            onChange={(e) => onInputChange(`strengths${team}`, e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-800/70 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-3 h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.017c.163 0 .326.02.485.06L17 5.266V18a2 2 0 01-2 2h-2.5" /></svg>
                        <textarea
                            rows={2}
                            placeholder="Слабые стороны"
                            value={values[`weaknesses${team}`]}
                            onChange={(e) => onInputChange(`weaknesses${team}`, e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-800/70 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-3 h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                        <textarea
                            rows={2}
                            placeholder="Стиль игры"
                            value={values[`playStyle${team}`]}
                            onChange={(e) => onInputChange(`playStyle${team}`, e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-800/70 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-3 h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <textarea
                            rows={3}
                            placeholder="Прогноз ключевых моментов"
                            value={values[`momentPredict${team}`]}
                            onChange={(e) => onInputChange(`momentPredict${team}`, e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-800/70 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        />
                    </div>
                </div>
            </div>
        </CustomCard>
    </div>
);