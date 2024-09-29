import React, { useState } from "react";
import { Box, Typography, IconButton, Collapse, SxProps } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  sx?: SxProps;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children, sx }) => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={sx}>
      {/* Заголовок со стрелкой слева от текста */}
      <Box
        display="flex"
        alignItems="center"
        onClick={handleToggle}
        sx={{ cursor: "pointer" }}
      >
        <IconButton>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Контент, передаваемый через children */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ marginTop: 2 }}>{children}</Box>
      </Collapse>
    </Box>
  );
};

export default Collapsible;
