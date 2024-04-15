import { wait } from "../../utils/wait";
import * as z from "zod";
import { ARTISTS } from "./artists";
import { PUBLIC_AUDIODB_URL } from "../config";
import Fuse from "fuse.js";

export const MvidSchema = z.object({
  idTrack: z.string(),
  idAlbum: z.optional(z.nullable(z.string())),
  strArtist: z.optional(z.nullable(z.string())),
  idArtist: z.optional(z.nullable(z.string())),
  strTrack: z.optional(z.nullable(z.string())),
  strMusicVid: z.optional(z.nullable(z.string())),
  strTrackThumb: z.optional(z.nullable(z.string())),
});

export type Mvid = z.infer<typeof MvidSchema>;

export const MvidQuerySchema = z.object({
  mvids: z.array(MvidSchema),
});

export const AlbumSchema = z.object({
  idAlbum: z.string(),
  strAlbum: z.string(),
  idArtist: z.string(),
  strArtist: z.string(),
  idLabel: z.optional(z.nullable(z.string())),
  strLabel: z.optional(z.nullable(z.string())),
  intYearReleased: z.optional(z.nullable(z.string())),
  strStyle: z.optional(z.nullable(z.string())),
  strGenre: z.optional(z.nullable(z.string())),
  strReleaseFormat: z.optional(z.nullable(z.string())),
  strAlbumThumb: z.optional(z.nullable(z.string())),
  tracks: z.optional(z.nullable(z.array(MvidSchema))),
});

export type Album = z.infer<typeof AlbumSchema>;

export const AlbumQuerySchema = z.object({
  album: z.array(AlbumSchema),
});

export type AlbumQuery = z.infer<typeof AlbumQuerySchema>;

type ArtistInfo = {
  id: string;
  name: string;
  albums: Map<string, Album>;
  tracks: Mvid[];
};

const CACHE = new Map<string, ArtistInfo>();
const fuseARTISTS = new Fuse(ARTISTS, {
  includeScore: true,
  keys: ["name"],
});

export function getArtistByName(artistName: string) {
  const [best] = fuseARTISTS.search(artistName);
  if (!best) {
    throw new Error("Artist not found");
  }

  return best.item;
}

export async function getAlbumsByArtistId(artistId: string) {
  try {
    const response = await fetch(`${PUBLIC_AUDIODB_URL}/album.php?i=${artistId}`);
    const data = await response.json();
    return AlbumQuerySchema.parse(data);
  } catch (error) {
    console.error(error);
  }

  throw new Error(`Unable to get album from artist id ${artistId}`);
}

export async function getMvidsByArtistId(artistId: string) {
  try {
    const response = await fetch(`${PUBLIC_AUDIODB_URL}/mvid.php?i=${artistId}`);
    const data = await response.json();
    return MvidQuerySchema.parse(data);
  } catch (error) {
    console.error(error);
  }

  throw new Error(`Unable to get tracks from artist id ${artistId}`);
}

export async function getArtistInfo(artistName: string) {
  const artist = getArtistByName(artistName);
  let infos = CACHE.get(artist.id);
  console.log("infos cache", infos);
  if (infos) return infos;

  infos = {
    id: artist.id,
    name: artist.name,
    albums: new Map(),
    tracks: [],
  };

  console.log("infos", infos);

  const allAlbums = await getAlbumsByArtistId(artist.id);
  console.log("allAlbums", allAlbums);
  await wait(1000); // 1 request per second limit
  const allMvids = await getMvidsByArtistId(artist.id);
  console.log("allMvids", allMvids);

  const albumsMap = new Map(allAlbums.album.map((album) => [album.idAlbum, album]));
  allMvids.mvids.forEach((mvid) => {
    if (mvid.idAlbum) {
      const album = albumsMap.get(mvid.idAlbum);
      if (album) {
        if (!infos.albums.has(mvid.idAlbum)) {
          infos.albums.set(mvid.idAlbum, album);
        }
        if (!album.tracks) {
          album.tracks = [];
        }
        album.tracks.push(mvid);
      }
    }

    infos.tracks.push(mvid);
  });

  console.log("infos", infos);

  CACHE.set(artist.id, infos);
  return infos;
}
