import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import SellIcon from "@mui/icons-material/Sell";
import StarIcon from "@mui/icons-material/Star";
import { teal } from "@mui/material/colors";

import { AgentCardProps } from "./AgentCard.types";

const AgentCardHorizontal: React.FC<AgentCardProps> = ({
  image,
  type,
  name,
  sales,
  phone,
  priority,
  discount,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        minWidth: 400,
        padding: 2,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "auto",
          height: "100%",
          borderRadius: 1.5,
          objectFit: "cover",
          marginRight: 2,
          alignItems: "center",
        }}
        image={image}
        alt={`${name} image`}
      />
      <CardContent sx={{ padding: 0, flexGrow: 1 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ marginBottom: -0.5 }}
            >{`${name}`}</Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
            >{`${type}`}</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SellIcon fontSize="inherit" color="primary" />
              <Typography variant="body2">{`${sales} продаж за год`}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon fontSize="inherit" color="primary" />
              <Typography variant="body2">{phone}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <StarIcon fontSize="inherit" color="primary" />
              <Typography variant="body2">{`Приоритет: ${priority}`}</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>

      <Box sx={{ display: "flex", alignItems: "top", marginLeft: 2 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={(theme) => ({
            color: discount > 25 ? teal[200] : theme.palette.primary.main,
          })}
        >
          {`${discount}%`}
        </Typography>
      </Box>
    </Card>
  );
};

export default AgentCardHorizontal;
