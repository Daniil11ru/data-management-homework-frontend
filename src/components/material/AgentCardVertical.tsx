import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import SellIcon from "@mui/icons-material/Sell";
import StarIcon from "@mui/icons-material/Star";
import { teal } from "@mui/material/colors";

import { lighten } from '@mui/system'; 

import { AgentCardSelectableProps } from "./AgentCard.types";

const AgentCardVertical: React.FC<AgentCardSelectableProps> = ({
  image,
  type,
  name,
  sales,
  phone,
  priority,
  discount,
  isSelected,
  onClick,
}) => {
  return (
    <Card
      sx={(theme) => ({
        padding: 0,
        borderRadius: 2,
        boxShadow: 3,
        cursor: "pointer",
        backgroundColor: isSelected ? lighten(theme.palette.background.paper, 0.1) : theme.palette.background.paper,
        transition: "background-color 0.2s ease",
      })}
      onClick={onClick}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {type}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={(theme) => ({
              color: discount > 25 ? teal[200] : theme.palette.primary.main,
            })}
          >
            {`${discount}%`}
          </Typography>
        </Box>

        <CardMedia
          component="img"
          sx={{
            width: 200,
            height: 200,
            borderRadius: 2,
            marginTop: 2,
          }}
          image={image}
          alt={`${name} image`}
        />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            marginTop: 2,
          }}
        >
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
      </CardContent>
    </Card>
  );
};

export default AgentCardVertical;
