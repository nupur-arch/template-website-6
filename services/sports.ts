import { apiClient } from "@/lib/api/client";
import { mapApiLeague, mapApiMatch, mapApiPlayer, mapApiStanding, mapApiTeam } from "@/lib/api/mappers";
import { mockLeagues, mockMatches, mockPlayers, mockStandings, mockTeams } from "@/mocks/sports";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";
export const getTeams = async () => useMock ? mockTeams : (await apiClient<Record<string, unknown>[]>("teams")).map(mapApiTeam);
export const getPlayers = async () => useMock ? mockPlayers : (await apiClient<Record<string, unknown>[]>("players")).map(mapApiPlayer);
export const getLeagues = async () => useMock ? mockLeagues : (await apiClient<Record<string, unknown>[]>("leagues")).map(mapApiLeague);
export const getMatches = async () => useMock ? mockMatches : (await apiClient<Record<string, unknown>[]>("matches")).map(mapApiMatch);
export const getStandings = async () => useMock ? mockStandings : (await apiClient<Record<string, unknown>[]>("standings")).map(mapApiStanding);
