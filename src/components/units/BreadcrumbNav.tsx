import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface BreadcrumbNavProps {
  paths: { label: string; path?: string }[];
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ paths }) => {
  const navigate = useNavigate();

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {paths.map((crumb, index) => (
        crumb.path ? (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            onClick={() => {
              if (crumb.path) {
                navigate(crumb.path);
              }
            }}
            sx={{ cursor: "pointer" }}
          >
            {crumb.label}
          </Link>
        ) : (
          <Typography key={index} color="text.primary">
            {crumb.label}
          </Typography>
        )
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
