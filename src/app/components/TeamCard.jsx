import { CustomCard } from "./CustomCard";
import {
    TrophyOutlined,
    LikeOutlined,
    DislikeOutlined,
    SketchOutlined
} from "@ant-design/icons";

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
                        <TrophyOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                        <input
                            type="text"
                            placeholder="Рейтинг команды"
                            value={values[`rate${team}`]}
                            onChange={(e) => onInputChange(`rate${team}`, e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800/70 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div className="relative">
                        <LikeOutlined className="absolute left-3 top-3 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                        <textarea
                            rows={2}
                            placeholder="Сильные стороны"
                            value={values[`strengths${team}`]}
                            onChange={(e) => onInputChange(`strengths${team}`, e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800/70 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div className="relative">
                        <DislikeOutlined className="absolute left-3 top-3 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                        <textarea
                            rows={2}
                            placeholder="Слабые стороны"
                            value={values[`weaknesses${team}`]}
                            onChange={(e) => onInputChange(`weaknesses${team}`, e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800/70 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div className="relative">
                        <SketchOutlined className="absolute left-3 top-3 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                        <textarea
                            rows={2}
                            placeholder="Стиль игры"
                            value={values[`playStyle${team}`]}
                            onChange={(e) => onInputChange(`playStyle${team}`, e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800/70 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        />
                    </div>
                </div>
            </div>
        </CustomCard>
    </div>
);