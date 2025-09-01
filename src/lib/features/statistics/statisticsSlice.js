import { createSlice } from "@reduxjs/toolkit";
import {} from "../../../types/statistics";
import {} from "../../../types/aveageStatistics";

const createEmptyStatistic = () => ({
  total: "",
  individualTotal: "",
  individualTotalOpponent: "",
});

const createEmptyTeam = () => ({
  logo: "",
  shortName: "",
  country: { logo: "", name: "" },
  slug: "",
});

const createEmptyLastMatch = () => ({
  result: { ht: "", total: "" },
  teams: { home: createEmptyTeam(), away: createEmptyTeam() },
  sportSlug: "",
});

const createEmptyAverageStats = () => ({
  all: {
    goals: createEmptyStatistic(),
    corners: createEmptyStatistic(),
    fouls: createEmptyStatistic(),
    offsides: createEmptyStatistic(),
    throwins: createEmptyStatistic(),
    yellowcards: createEmptyStatistic(),
    shots: createEmptyStatistic(),
    shotstarget: createEmptyStatistic(),
  },
  first: {
    goals: createEmptyStatistic(),
    corners: createEmptyStatistic(),
    fouls: createEmptyStatistic(),
    offsides: createEmptyStatistic(),
    throwins: createEmptyStatistic(),
    yellowcards: createEmptyStatistic(),
    shots: createEmptyStatistic(),
    shotstarget: createEmptyStatistic(),
  },
  second: {
    goals: createEmptyStatistic(),
    corners: createEmptyStatistic(),
    fouls: createEmptyStatistic(),
    offsides: createEmptyStatistic(),
    throwins: createEmptyStatistic(),
    yellowcards: createEmptyStatistic(),
    shots: createEmptyStatistic(),
    shotstarget: createEmptyStatistic(),
  },
});

const initialState = {
  statistics: {
    topOutcomes: {
      outcomes: [{ outcome: "", count: 0, percent: 0, rate: 0, type: "" }],
    },
    teams: { home: createEmptyTeam(), away: createEmptyTeam() },
    matches: {
      pastHome: [createEmptyLastMatch()],
      pastAway: [createEmptyLastMatch()],
      pastCros: [createEmptyLastMatch()],
    },
    leagueTable: [
      {
        position: 1,
        team: createEmptyTeam(),
        winTotal: 20,
        lossTotal: 5,
        drawTotal: 3,
        goalsTotal: "50:20",
        key: "1",
      },
    ],
    predictionStats: {},
    info: {},
  },
  averageStatistics: {
    home: createEmptyAverageStats(),
    away: createEmptyAverageStats(),
  },
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setLeagueTable: (state, action) => {
      state.statistics.leagueTable = action.payload;
    },
    setMatches: (state, action) => {
      state.statistics.matches = action.payload;
    },
    setOutcomes: (state, action) => {
      state.statistics.topOutcomes = action.payload;
    },
    setTeams: (state, action) => {
      state.statistics.teams = action.payload;
    },
    setAverageStatistics: (state, action) => {
      state.averageStatistics = action.payload;
    },
  },
});

export const {
  setLeagueTable,
  setMatches,
  setOutcomes,
  setTeams,
  setAverageStatistics,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;