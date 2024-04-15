import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import type { MessageDisplayProps } from "./MessageDisplay";

export default function MessageAlbumDisplay({ message }: MessageDisplayProps) {
  if (message.type !== "album") return null;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={message.album.thumb} alt={message.album.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {message.album.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {message.album.artist}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {message.album.year}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// import { useChatbotDispatch } from "../../store/store";
// import { sendMessage } from "../../store/chatbotSlice";
// import { MessageAlbums } from "../../api/messages";

// export default function MessageAlbumsDisplay({ message }: MessageDisplayProps) {
//   const dispatch = useChatbotDispatch();

//   if (message.type !== "albums") return null;

//   const handleClickChoice = (album: MessageAlbums["albums"][number]) => {
//     dispatch(sendMessage(`Play a song from ${album.artist} on the album ${album.name}`));
//   };

//   return (
//     <Box component="ul" sx={{ my: 0 }}>
//       {message.albums.map((choice) => (
//         <Box component="li">
//           <Button key={choice.id} variant="outlined" size="medium" sx={{ mb: 1 }} onClick={() => handleClickChoice(choice)}>
//             {choice.name}
//           </Button>
//         </Box>
//       ))}
//     </Box>
//   );
// }
