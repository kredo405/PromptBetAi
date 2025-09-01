'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../../../lib/hooks'
import { setCurrentLink } from '../../../lib/features/link/linkSlice'
import { setLeagueTable, setMatches, setTeams, setOutcomes } from '../../../lib/features/statistics/statisticsSlice'
import apiService from '../../../services/api';
import Header from '@/app/components/Header'
import { Loading } from '@/app/components/Loading'
import { Card, Collapse, Input, Button } from "antd";
import { ErrorModal } from '@/app/components/ErrorModal';
import { generateAiPrompt } from '@/app/utils/promt'
import { TeamCard } from '@/app/components/TeamCard'
import { useState } from 'react'
import {
  EditOutlined,
  CopyOutlined
} from "@ant-design/icons";

const { Panel } = Collapse;
const { TextArea } = Input;

  const [error, setError] = useState(null)

  const showError = (message) => {
    setError(message);
  };

  const clearError = () => {
    setError(null);
  };

function formatOdds(odds) {
    const result = [];

    // Перебираем все категории ставок (например, both_to_score, corners_one_x_two)
    for (const [category, outcomes] of Object.entries(odds)) {
        // Игнорируем служебные свойства
        if (category === '__proto__' || outcomes === null || typeof outcomes !== 'object') continue;

        // Для категорий с вложенными исходами (например, both_to_score: {yes: {...}, no: {...}})
        if (!outcomes.hasOwnProperty('value')) {
            for (const [outcome, data] of Object.entries(outcomes)) {
                if (data && typeof data === 'object' && data.value > 1.5) {
                    result.push(`${category} ${outcome} коэфициент: ${data.value}`);
                }
            }
        }
        // Для категорий с прямым значением коэффициента
        else if (outcomes.value > 1.5) {
            result.push(`${category} -${outcomes.value}`);
        }
    }

    return result.join(', ');
}

const removeAllTags = (str) => {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "");
};

export default function MatchPage() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const { slug } = params

  const [isLoading, setIsLoading] = useState(false)
   const [preview, setPreview] = useState("")
   const [homeLogo, setHomeLogo] = useState("")
   const [awayLogo, setAwayLogo] = useState("")
   const [state, setState] = useState({
    odds: {},
    lastMatchesHome: [],
    lastMatchesAway: [],
    lastMatchesH2h: [],
    strengthsHome: "",
    strengthsAway: "",
    weaknessesHome: "",
    weaknessesAway: "",
    playStyleHome: "",
    playStyleAway: "",
    description: "",
    rateHome: "",
    rateAway: "",
    momentPredict: "",
    homeTeamName: '',
    awayTeamName: ""
  });
  const [result, setResult] = useState("")

   const handleInputChange = (field, value) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

    const getPredict = () => {
       setResult(generateAiPrompt(
        state.homeTeamName,
        state.awayTeamName,
        state.lastMatchesHome,
        state.rateHome,
        state.strengthsHome,
        state.weaknessesHome,
        state.playStyleHome,
        state.lastMatchesAway,
        state.rateAway,
        state.strengthsAway,
        state.weaknessesAway,
        state.playStyleAway,
        state.lastMatchesH2h,
        state.description,
        state.odds,
        preview
      ))
    }

  useEffect(() => {
    
    if (slug) {
      const link = slug[0]
      dispatch(setCurrentLink(link))

      const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getStatistics({ link});
        const statsData = response.statistics.data;
        setState(prev => ({
          ...prev,
          homeTeamName: statsData.teams.home.name,
          awayTeamName: statsData.teams.away.name,
          lastMatchesHome: statsData.matches.pastHome.map(el => {
            return `${el.matchDate} ${el.teams.home.name}-${el.teams.away.name} первый тайм: ${el.resultScores.halfTime} весь матч: ${el.resultScores.total}`
          }),
          lastMatchesAway: statsData.matches.pastAway.map(el => {
            return `${el.matchDate}  ${el.teams.home.name}-${el.teams.away.name} первый тайм: ${el.resultScores.halfTime} весь матч: ${el.resultScores.total}`
          }),
          lastMatchesH2h: statsData.matches.pastCross.matches.map(el => {
            return `${el.matchDate} ${el.teams.home.name}-${el.teams.away.name} первый тайм: ${el.result.halfTime} весь матч: ${el.result.total}`
          }),
        }));

        setHomeLogo(statsData.teams.home.logo)
        setAwayLogo(statsData.teams.away.logo)
        console.log(statsData)
        const preview = await apiService.getPreview({
          link: link,
        });
        console.log(removeAllTags(preview.preview.data.prediction));
        setPreview(removeAllTags(preview.preview.data.prediction));

        const oddsResponse = await apiService.getOdds({ link: link });
        const odds = oddsResponse.odds.data.odds;
         setState(prev => ({
          ...prev,
          odds: formatOdds(odds)
        }));

        console.log(odds)

      } catch (error) {
        showError(`Failed to fetch matches: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    }
  }, [slug])

  console.log(state)

  return (
    <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 min-h-screen bg-fixed font-sans text-white">
      <Header />
      <ErrorModal message={error} visible={!!error} onOk={clearError} />
      {isLoading ? <Loading /> : <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Card
          className="mb-8 bg-white/10 backdrop-blur-lg border border-cyan-400/30 shadow-xl"
          styles={{
            body: { backgroundColor: 'transparent', padding: '24px' }
          }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-cyan-200 mb-2 tracking-wider">
            {`${state.homeTeamName} vs ${state.awayTeamName}`}
          </h1>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <TeamCard
            team="Home"
            logo={`https://cdn.stavka.tv${homeLogo}`}
            name={state.homeTeamName}
            onInputChange={handleInputChange}
            values={state}
          />

          <div className="flex flex-col items-center justify-center order-first lg:order-none">
            <div className="flex flex-col items-center">
              <span className="text-white font-black text-4xl bg-cyan-700/50 px-6 py-4 rounded-full shadow-lg">
                VS
              </span>
            </div>
          </div>

          <TeamCard
            team="Away"
            logo={`https://cdn.stavka.tv${awayLogo}`}
            name={state.awayTeamName}
            onInputChange={handleInputChange}
            values={state}
          />
        </div>

        <Collapse
          ghost
          expandIconPosition="end"
          className="bg-white/10 backdrop-blur-lg border border-cyan-400/30 shadow-xl mb-8"
        >
          <Panel
            header={
              <span className="text-cyan-200 text-xl font-semibold tracking-wider">
                <EditOutlined className="mr-3" />
                Дополнительные параметры анализа
              </span>
            }
            key="1"
            className="!text-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
              <Card className="bg-white/5 backdrop-blur-sm border border-cyan-400/20" styles={{ body: { padding: '24px' } }}>
                <h3 className="text-cyan-300 mb-4 text-lg font-semibold">Прогноз ключевых моментов</h3>
                <TextArea
                  rows={4}
                  placeholder="Опишите ключевые моменты матча (голевые моменты, стандарты, тактика и т.д.)"
                  value={state.momentPredict}
                  onChange={(e) => handleInputChange("momentPredict", e.target.value)}
                  className="!bg-white/10 !border-cyan-400/30 !text-white placeholder:!text-gray-400 mb-6"
                />

                <h3 className="text-cyan-300 mb-4 text-lg font-semibold">Экспертное мнение</h3>
                <TextArea
                  rows={4}
                  placeholder="Добавьте описание матча и ваше мнение"
                  value={state.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="!bg-white/10 !border-cyan-400/30 !text-white placeholder:!text-gray-400"
                />
              </Card>

              <div className="flex flex-col justify-center items-center bg-white/5 p-8 rounded-lg border border-cyan-400/20">
                <Button
                  type="primary"
                  size="large"
                  onClick={getPredict}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 h-16 w-full max-w-xs font-bold text-xl shadow-lg rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Сгенерировать AI прогноз
                </Button>
                <p className="text-gray-400 mt-6 text-center max-w-md">
                  На основе всех введенных данных будет создан подробный промт для анализа матча с рекомендациями по ставкам.
                </p>
              </div>
            </div>
          </Panel>
        </Collapse>

        {result && (
          <Card
            title={<span className="text-cyan-200 text-xl font-semibold tracking-wider">Сгенерированный промт для AI</span>}
            className="bg-white/10 backdrop-blur-lg border border-cyan-400/30 shadow-xl"
            extra={
              <Button
                icon={<CopyOutlined />}
                onClick={() => navigator.clipboard.writeText(result)}
                className="flex items-center text-cyan-300 border-cyan-300 hover:text-white hover:border-white transition-colors duration-300"
              >
                Скопировать
              </Button>
            }
          >
            <div className="whitespace-pre-wrap text-gray-200 bg-gray-900/80 p-6 rounded-lg overflow-x-auto max-h-[600px] overflow-y-auto font-mono text-sm leading-relaxed">
              {result}
            </div>
          </Card>
        )}
      </main>}
    </div>
  )
}
