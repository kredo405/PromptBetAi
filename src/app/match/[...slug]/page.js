'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../../../lib/hooks'
import { setCurrentLink } from '../../../lib/features/link/linkSlice'
import { setLeagueTable, setMatches, setTeams, setOutcomes } from '../../../lib/features/statistics/statisticsSlice'
import apiService from '../../../services/api';
import Header from '@/app/components/Header'
import { Loading } from '@/app/components/Loading'
import { CustomCard } from '@/app/components/CustomCard';
import { ErrorModal } from '@/app/components/ErrorModal';
import { generateAiPrompt } from '@/app/utils/promt'
import { TeamCard } from '@/app/components/TeamCard'
import { useState } from 'react'



const removeAllTags = (str) => {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "");
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

export default function MatchPage() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const { slug } = params

  const [error, setError] = useState(null)

  const showError = (message) => {
    setError(message);
  };

  const clearError = () => {
    setError(null);
  };

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
          const response = await apiService.getStatistics({ link });
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

  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const collapseItems = [
    {
      key: '1',
      label: (
        <span className="text-cyan-200 text-xl font-semibold tracking-wider">
          Дополнительные параметры анализа
        </span>
      ),
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-400/20 p-6 rounded-lg">
            <h3 className="text-cyan-300 mb-4 text-lg font-semibold">Прогноз ключевых моментов</h3>
            <textarea
              rows={4}
              placeholder="Опишите ключевые моменты матча (голевые моменты, стандарты, тактика и т.д.)"
              value={state.momentPredict}
              onChange={(e) => handleInputChange("momentPredict", e.target.value)}
              className="w-full pl-4 pr-4 py-2 bg-gray-800/70 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-all mb-6"
            />

            <h3 className="text-cyan-300 mb-4 text-lg font-semibold">Экспертное мнение</h3>
            <textarea
              rows={4}
              placeholder="Добавьте описание матча и ваше мнение"
              value={state.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full pl-4 pr-4 py-2 bg-gray-800/70 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
            />
          </div>

          <div className="flex flex-col justify-center items-center bg-white/5 p-8 rounded-lg border border-cyan-400/20">
            <button
              onClick={getPredict}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 h-16 w-full max-w-xs font-bold text-xl shadow-lg rounded-lg transition-all duration-300 transform hover:scale-105 text-white"
            >
              Сгенерировать AI прогноз
            </button>
            <p className="text-gray-400 mt-6 text-center max-w-md">
              На основе всех введенных данных будет создан подробный промт для анализа матча с рекомендациями по ставкам.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 min-h-screen bg-fixed font-sans text-white">
      <Header />
      <ErrorModal message={error} visible={!!error} onOk={clearError} />
      {isLoading ? <Loading /> : <main className="container mx-auto px-4 py-8 max-w-7xl">
        <CustomCard className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-cyan-200 mb-2 tracking-wider">
            {`${state.homeTeamName} vs ${state.awayTeamName}`}
          </h1>
        </CustomCard>

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

        <div className="bg-white/10 backdrop-blur-lg border border-cyan-400/30 shadow-xl mb-8 rounded-lg">
          <button
            onClick={() => setIsCollapseOpen(!isCollapseOpen)}
            className="w-full flex justify-between items-center p-4 text-cyan-200 text-xl font-semibold tracking-wider"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Дополнительные параметры анализа
            </span>
            <span className={`transform transition-transform duration-300 ${isCollapseOpen ? 'rotate-180' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          {isCollapseOpen && collapseItems[0].children}
        </div>

        {result && (
          <CustomCard title="Сгенерированный промт для AI">
            <div className="relative">
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="absolute top-2 right-2 flex items-center text-cyan-300 border border-cyan-300 hover:text-white hover:border-white transition-colors duration-300 px-4 py-2 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Скопировать
              </button>
              <div className="whitespace-pre-wrap text-gray-200 bg-gray-900/80 p-6 rounded-lg overflow-x-auto max-h-[600px] overflow-y-auto font-mono text-sm leading-relaxed">
                {result}
              </div>
            </div>
          </CustomCard>
        )}
      </main>}
    </div>
  )
}
