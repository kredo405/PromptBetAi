'use client';

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { ErrorModal } from "./components/ErrorModal";
import { Loading } from "./components/Loading";
import { getCurrentDate, getNextDate } from "./utils/date";
import { useDispatch } from "react-redux";
import { setCurrentSport } from "@/lib/features/sport/sportSlice";
import { MatchItem } from "./components/MatchItem";
import { LeagueItem } from "./components/LeagueItem";
import apiService from "../services/api";
import Header from "./components/Header";

export default function Home() {
  const params = useParams();
  const sport = params.sport

  const [arrMatches, setArrayMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const fetchMatches = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getMatchesPrematch({
          limit: 150,
          dateFrom: getCurrentDate(),
          dateTo: getNextDate(),
          status: "upcoming",
          sport: getSportQuery(sport),
        });
        console.log(response.matches.data);
        setArrayMatches(response.matches.data ?? []);

        if (response.matches.data.length > 0 && response.matches.data[0].matches.length > 0) {
          dispatch(
            setCurrentSport(response.matches.data[0].matches[0].sportSlug)
          );
        }
      } catch (error) {
        console.error("Failed to fetch matches:", error);
        ErrorModal(`Failed to fetch matches: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [sport, dispatch]);

  const filteredMatches = useMemo(() => {
    if (!searchQuery.trim()) return arrMatches;
    const query = searchQuery.toLowerCase();
    return arrMatches.filter((league) =>
      league.country.name.toLowerCase().includes(query)
    );
  }, [arrMatches, searchQuery]);

  const elements =
    filteredMatches.length > 0
      ? filteredMatches.map((el, i) => {
          const matchElementsFiltered = el.matches.filter(
            (match) =>
              (match.predictionStats.total >= 20 &&
                match.sportSlug === "soccer")
          );

          if (matchElementsFiltered.length === 0) {
            return null;
          } else {
            const matchElements = matchElementsFiltered.map((item, idx) => (
              <MatchItem match={item} idx={idx} key={idx} />
            ));

            return (
              <LeagueItem league={el} matchElements={matchElements} key={i} />
            );
          }
        })
      : [];

  const filteredElements = (Array.isArray(elements) ? elements : []).filter(
    (el) => el !== null
  );

  return (
    <div className="h-full bg-slate-800">
      <Header />
      <div>
        <div className="container mx-auto lg:px-44 pt-10 pb-10">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="mb-10 px-3">
                <form>
                  <input
                    className="rounded-lg w-full md:w-5/12 px-3 py-2 bg-slate-700"
                    placeholder="Введите название страны"
                    type="search"
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
              {filteredElements.length > 0 ? (
                filteredElements
              ) : (
                <>
                  <div className="flex flex-col justify-center items-center text-center h-64">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 mt-4">На данный момент нет матчей</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Вспомогательная функция для преобразования параметров
export const getSportQuery = (sport) => {
  switch (sport) {
    case "football":
      return "sport=soccer";
    case "basketball":
      return "sport=basketball";
    case "tenis":
      return "sport=tennis";
    case "hockey":
      return "sport=ice-hockey";
    default:
      return "sport=soccer";
  }
};