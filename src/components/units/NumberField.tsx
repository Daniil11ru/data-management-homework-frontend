import * as React from "react";
import { SxProps, TextField } from "@mui/material";

interface NumberFieldProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number | string;
  label?: string;
  fullWidth?: boolean;
  name?: string;
  sx?: SxProps;
  error?: boolean;
  helperText?: string;
  defaultValueOnEmpty?: number | ""; // Новый проп для значения по умолчанию
}

const NumberField: React.FC<NumberFieldProps> = ({
  onChange,
  value = 0,
  label,
  fullWidth,
  name,
  sx,
  error,
  helperText,
  defaultValueOnEmpty = 0, // Значение по умолчанию при пустом поле
}) => {
  // Обрабатываем изменение значения и удаляем ведущие нули
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let sanitizedValue = event.target.value;

    // Удаляем все ведущие нули (например, "005" становится "5")
    if (sanitizedValue.length > 1) {
      sanitizedValue = sanitizedValue.replace(/^0+(?=\d)/, "");
    }

    // Если значение пустое, подставляем defaultValueOnEmpty
    if (sanitizedValue === "") {
      sanitizedValue = defaultValueOnEmpty.toString();
    }

    // Создаем новое событие с обновленным значением
    const syntheticEvent = {
      ...event,
      target: { ...event.target, value: sanitizedValue, name: event.target.name },
    } as React.ChangeEvent<HTMLInputElement>;

    if (onChange) {
      onChange(syntheticEvent); // Вызываем onChange с измененным значением
    }
  };

  // Обработчик нажатия клавиш для фильтрации недопустимых символов
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Разрешаем только цифры, управляющие клавиши, и точку
    if (
      !/[0-9]/.test(event.key) && // Ввод только цифр
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(event.key) // Управляющие клавиши
    ) {
      event.preventDefault();
    }
  };

  return (
    <TextField
      name={name}
      fullWidth={fullWidth}
      label={label}
      value={value.toString()} // Преобразуем значение в строку для корректного отображения
      onChange={handleInputChange}
      onKeyDown={handleKeyDown} // Ограничиваем ввод только цифрами
      type="number"
      error={error}
      helperText={helperText}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      sx={{
        ...sx,
        "& input": {
          MozAppearance: "textfield",
        },
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
        },
        "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button": {
          filter: "invert(1)",
        },
      }}
    />
  );
};

export default NumberField;
