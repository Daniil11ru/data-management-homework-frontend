import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import { Edit } from "@mui/icons-material";

interface EditableTextLabelProps {
  initialValue: string;
  fontSize?: number;
  onChange?: (newValue: string) => void; // Пропс для обработчика изменений
}

const EditableTextLabel: React.FC<EditableTextLabelProps> = ({
  initialValue,
  fontSize = 16,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false); // Режим редактирования
  const [value, setValue] = useState(initialValue); // Значение текста
  const [inputValue, setInputValue] = useState(initialValue); // Временное значение для редактирования

  // Следим за изменением initialValue и обновляем value
  useEffect(() => {
    setValue(initialValue);
    setInputValue(initialValue);
  }, [initialValue]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setValue(inputValue);
    setIsEditing(false);

    // Вызываем onChange при сохранении
    if (onChange) {
      onChange(inputValue);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  return (
    <Box display="flex" alignItems="center" maxWidth={"100%"}>
      {isEditing ? (
        <TextField
          variant="standard"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          autoFocus
          size="small"
          inputProps={{ style: { fontSize } }}
        />
      ) : (
        <>
          <Typography
            variant="body1"
            maxWidth={"100%"}
            sx={{
              marginRight: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize,
            }}
          >
            {value}
          </Typography>
          <IconButton onClick={handleEdit} size="small">
            <Edit fontSize="small" />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default EditableTextLabel;
