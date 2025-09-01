import { Card, Input } from "antd";
import {
    TrophyOutlined,
    LikeOutlined,
    DislikeOutlined,
    SketchOutlined
} from "@ant-design/icons";

const { TextArea } = Input;

export const TeamCard = ({ team, logo, name, onInputChange, values }) => (
    <Card
        className="bg-white/10 backdrop-blur-lg border border-cyan-400/30 shadow-xl"
        title={<span className="text-cyan-200 font-bold text-lg tracking-wider">{name}</span>}
        styles={{
            header: { backgroundColor: 'rgba(7, 27, 60, 0.7)', borderBottom: '1px solid rgba(8, 145, 178, 0.5)' },
            body: { backgroundColor: 'rgba(11, 48, 107, 0.7)', padding: '16px' }
        }}
    >
        <div className="flex flex-col items-center text-white">
            <img
                className="w-24 h-24 object-contain mb-4 bg-white/80 p-2 rounded-full shadow-lg"
                src={logo}
                alt={name}
            />

            <div className="w-full space-y-4">
                <Input
                    prefix={<TrophyOutlined className="text-cyan-300/70" />}
                    placeholder="Рейтинг команды"
                    value={values[`rate${team}`]}
                    onChange={(e) => onInputChange(`rate${team}`, e.target.value)}
                    className="!bg-white/10 !border-cyan-400/30 !text-white placeholder:!text-gray-400"
                />
                <TextArea
                    rows={2}
                    prefix={<LikeOutlined className="text-cyan-300/70" />}
                    placeholder="Сильные стороны"
                    value={values[`strengths${team}`]}
                    onChange={(e) => onInputChange(`strengths${team}`, e.target.value)}
                     className="!bg-white/10 !border-cyan-400/30 !text-white placeholder:!text-gray-400"
                />
                <TextArea
                    rows={2}
                    prefix={<DislikeOutlined className="text-cyan-300/70" />}
                    placeholder="Слабые стороны"
                    value={values[`weaknesses${team}`]}
                    onChange={(e) => onInputChange(`weaknesses${team}`, e.target.value)}
                     className="!bg-white/10 !border-cyan-400/30 !text-white placeholder:!text-gray-400"
                />
                <TextArea
                    rows={2}
                    prefix={<SketchOutlined className="text-cyan-300/70" />}
                    placeholder="Стиль игры"
                    value={values[`playStyle${team}`]}
                    onChange={(e) => onInputChange(`playStyle${team}`, e.target.value)}
                     className="!bg-white/10 !border-cyan-400/30 !text-white placeholder:!text-gray-400"
                />
            </div>
        </div>
    </Card>
);