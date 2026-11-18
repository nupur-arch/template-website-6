import type { League, Match, Player, Standing, Team } from "@/types";

export const mockTeams: Team[] = [
  { id: "team-1", name: "Dhaka Comets", shortName: "DHC", logo: null },
  { id: "team-2", name: "Chattogram Waves", shortName: "CTW", logo: null },
  { id: "team-3", name: "Sylhet Sparks", shortName: "SYS", logo: null },
];
export const mockPlayers: Player[] = [
  { id: "player-1", name: "Nadia Rahman", teamId: "team-1", position: "Forward", image: null },
  { id: "player-2", name: "Arif Hasan", teamId: "team-2", position: "Keeper", image: null },
];
export const mockLeagues: League[] = [{ id: "league-1", name: "Metro League", slug: "metro-league", sport: "football" }];
export const mockMatches: Match[] = [{ id: "match-1", leagueId: "league-1", homeTeam: mockTeams[0], awayTeam: mockTeams[1], homeScore: null, awayScore: null, startsAt: "2026-11-20T14:00:00.000Z", status: "scheduled" }];
export const mockStandings: Standing[] = mockTeams.map((team, index) => ({ id: `standing-${index + 1}`, leagueId: "league-1", team, played: 8, won: 6 - index, drawn: 1, lost: 1 + index, points: 19 - index * 3 }));
