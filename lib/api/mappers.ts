import type { Article, Category, League, Match, Player, Standing, Team } from "@/types";

type RecordLike = Record<string, unknown>;
const text = (value: unknown) => String(value ?? "");
const number = (value: unknown) => Number(value ?? 0);

export const mapApiCategory = (raw: RecordLike): Category => ({ id: text(raw.id), name: text(raw.name), slug: text(raw.slug), color: text(raw.color) });
export const mapApiTeam = (raw: RecordLike): Team => ({ id: text(raw.id), name: text(raw.name), shortName: text(raw.short_name ?? raw.shortName), logo: raw.logo ? text(raw.logo) : null });
export const mapApiPlayer = (raw: RecordLike): Player => ({ id: text(raw.id), name: text(raw.name), teamId: text(raw.team_id ?? raw.teamId), position: text(raw.position), image: raw.image ? text(raw.image) : null });
export const mapApiLeague = (raw: RecordLike): League => ({ id: text(raw.id), name: text(raw.name), slug: text(raw.slug), sport: text(raw.sport) });
export const mapApiArticle = (raw: RecordLike): Article => ({ id: text(raw.id), slug: text(raw.slug), title: text(raw.title), excerpt: text(raw.excerpt), body: text(raw.body), category: mapApiCategory(raw.category as RecordLike), image: raw.image ? text(raw.image) : null, publishedAt: text(raw.published_at ?? raw.publishedAt), readTime: number(raw.read_time ?? raw.readTime), featured: Boolean(raw.featured) });
export const mapApiMatch = (raw: RecordLike): Match => ({ id: text(raw.id), leagueId: text(raw.league_id ?? raw.leagueId), homeTeam: mapApiTeam(raw.home_team as RecordLike), awayTeam: mapApiTeam(raw.away_team as RecordLike), homeScore: raw.home_score == null ? null : number(raw.home_score), awayScore: raw.away_score == null ? null : number(raw.away_score), startsAt: text(raw.starts_at ?? raw.startsAt), status: text(raw.status) as Match["status"] });
export const mapApiStanding = (raw: RecordLike): Standing => ({ id: text(raw.id), leagueId: text(raw.league_id ?? raw.leagueId), team: mapApiTeam(raw.team as RecordLike), played: number(raw.played), won: number(raw.won), drawn: number(raw.drawn), lost: number(raw.lost), points: number(raw.points) });
