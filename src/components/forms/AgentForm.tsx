import * as React from "react";
import { useState, useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";

import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

import Dropdown from "../units/Dropdown";
import NumberField from "../units/NumberField";
import { Agent } from "../../data/AgentSchema";
import { Sale } from "../../data/SaleSchema";
import { Product } from "../../data/ProductSchema";
import Collapsible from "../units/Collapsible";
import EditableTextLabel from "../units/EditableTextLabel";
import {
  Delete,
  DeleteOutline,
  Restore,
  SaveOutlined,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { SaleOperation, SaleOperationType, SaleSource } from "../../data/Utils";

type ExtendedSale = Sale & {
  source: SaleSource;
  productId: number;
};

interface AgentFormProps {
  agentTypeDropdownOptions: { value: string; label: string }[];
  products: Product[];
  submitButtonTitle: string;
  submitButtonIcon?: React.ReactNode;
  handleFormSubmit: (
    updatedAgent: Agent,
    salesOperations: SaleOperation[]
  ) => void;
  formPurpose: "add" | "edit";
  onDeleteClick?: () => void;
  agentInfo?: { agent: Agent; agentSales: Sale[] };
}

const AgentForm: React.FC<AgentFormProps> = ({
  agentTypeDropdownOptions,
  products,
  submitButtonTitle,
  submitButtonIcon,
  handleFormSubmit,
  formPurpose,
  onDeleteClick,
  agentInfo,
}) => {
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [agentDefault, setAgentDefault] = useState<Agent | null>(null);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [agentSales, setAgentSales] = useState<ExtendedSale[]>([]);
  const [newSale, setNewSale] = useState<ExtendedSale>({
    product: "",
    productId: 0,
    productCount: 0,
    date: new Date(),
    source: SaleSource.LOCAL,
  });
  const [agentSalesDefault, setAgentSalesDefault] = useState<ExtendedSale[]>(
    []
  );
  const [productTitleToProductId, setProductTitleToProductId] = useState<
    Map<string, number>
  >(new Map());
  const [salesOperations, setSalesOperations] = useState<SaleOperation[]>([]);

  useEffect(() => {
    if (formPurpose === "edit") {
      if (agentInfo && agentInfo.agentSales) {
        setAgent(agentInfo.agent);
        setAgentDefault(agentInfo.agent);
        const salesWithSource = agentInfo.agentSales.map((sale) => ({
          ...sale,
          productId: productTitleToProductId.get(sale.product) ?? -1,
          source: SaleSource.REMOTE,
        }));
        setAgentSales(salesWithSource);
        setAgentSalesDefault(salesWithSource);

        const productMap = new Map<string, number>();
        products.forEach((product) => {
          productMap.set(product.title, product.id);
        });
        setProductTitleToProductId(productMap);

        setLoading(false);
      }
    } else {
      setAgent({
        id: -1,
        logo: "",
        agentTypeId: agentTypeDropdownOptions.length > 0 ? Number(agentTypeDropdownOptions[0].value) : -1,
        title: "Агент",
        salesCount: 0,
        phone: "",
        priority: 0,
        discount: 0,
        email: "",
        totalSales: 0,
        address: "",
        INN: "",
        KPP: "",
        directorName: "",
      });
      setLoading(false);
    }
  }, [agentInfo, products]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (agent) {
      const updatedAgent = {
        ...agent,
        [event.target.name]: event.target.value,
      };

      setAgent(updatedAgent);
    }
  };

  const handleSelectChange = (agentTypeId: string) => {
    if (agent) {
      const updatedAgent = {
        ...agent,
        agentTypeId: Number(agentTypeId),
      };
      setAgent(updatedAgent);
    }
  };

  const handlePhoneNumberChange = (phoneNumber: string) => {
    if (agent) {
      const updatedAgent = {
        ...agent,
        phone: phoneNumber,
      };
      setAgent(updatedAgent);
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (agent && event.target.files) {
      const file = event.target.files[0];

      const updatedAgent = {
        ...agent,
        logo: URL.createObjectURL(file),
      };
      setAgent(updatedAgent);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAddSale = () => {
    if (newSale) {
      setSalesOperations([
        ...salesOperations,
        new SaleOperation(SaleOperationType.ADD, newSale, newSale.productId),
      ]);
      setAgentSales([...agentSales, newSale]);
      setNewSale({
        product: "",
        productId: -1,
        productCount: 0,
        date: new Date(),
        source: SaleSource.LOCAL,
      });
      handleCloseDialog();
    }
  };

  const handleDeleteSale = (index: number) => {
    if (agentSales[index].source === SaleSource.LOCAL) {
      for (let i = 0; i < salesOperations.length; i++) {
        if (
          salesOperations[i].type === SaleOperationType.ADD &&
          salesOperations[i].sale === agentSales[index]
        ) {
          setSalesOperations([
            ...salesOperations.slice(0, i),
            ...salesOperations.slice(i + 1),
          ]);
          break;
        }
      }
    } else {
      salesOperations.push(
        new SaleOperation(
          SaleOperationType.DELETE,
          agentSales[index],
          newSale.productId
        )
      );
    }

    const updatedSales = agentSales.filter((_, i) => i !== index);
    setAgentSales(updatedSales);
  };

  const handleFormSubmitInternal = (event: React.FormEvent) => {
    event.preventDefault();

    if (agent) {
      handleFormSubmit(agent, salesOperations);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmitInternal}
      onReset={() => {
        setAgent(agentDefault);
        setAgentSales(agentSalesDefault);
      }}
      marginTop={2}
      marginBottom={2}
      maxWidth={"100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "flex-end",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth={"100%"}
      >
        <Box display="flex" flexDirection="row" gap={2}>
          <Box
            component="img"
            sx={{
              width: 40,
              height: 40,
              objectFit: "scale-down",
              borderRadius: 2,
            }}
            alt="Пример изображения"
            src="https://via.placeholder.com/50x50"
          />

          <EditableTextLabel
            initialValue={agent?.title || ""}
            fontSize={24}
            onChange={(newValue) => {
              if (agent) {
                const updatedAgent = {
                  ...agent,
                  title: newValue,
                };
                setAgent(updatedAgent);
              }
            }}
          />
        </Box>

        <Box display="flex" flexDirection="row" gap={2} alignItems="center">
          <Button
            type="submit"
            variant="text"
            color="success"
            size="medium"
            endIcon={submitButtonIcon ? submitButtonIcon : <SaveOutlined />}
          >
            {submitButtonTitle}
          </Button>
          {formPurpose === "edit" && agentInfo && (
            <Button
              type="reset"
              variant="text"
              color="primary"
              size="medium"
              endIcon={<Restore />}
            >
              Сбросить
            </Button>
          )}
          {/* FIXME: кнопка удаления становится на миг доступна при загрузке, даже если у агента есть продажи */}
          {formPurpose === "edit" && onDeleteClick && agentInfo && (
            <Button
              variant="text"
              color="error"
              size="medium"
              type="button"
              onClick={onDeleteClick}
              disabled={loading || agentInfo?.agentSales.length > 0}
              endIcon={<DeleteOutline />}
            >
              Удалить
            </Button>
          )}
        </Box>
      </Box>

      <Collapsible title="Общая информация">
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="row" gap={3} width="100%">
            <Box display="flex" flexDirection="column" gap={2} width="50%">
              <NumberField
                label="Приоритет"
                name="priority"
                value={agent?.priority || 0}
                onChange={handleInputChange}
                error={agent ? agent?.priority < 0 : false}
                helperText={
                  agent
                    ? agent?.priority < 0
                      ? "Приоритет должен быть >= 0"
                      : ""
                    : ""
                }
                fullWidth
                sx={{ flex: 1 }}
              />

              <TextField
                label="Адрес"
                name="address"
                value={agent?.address || ""}
                onChange={handleInputChange}
                fullWidth
              />

              <NumberField
                label="ИНН"
                name="INN"
                value={agent?.INN || ""}
                defaultValueOnEmpty={""}
                onChange={handleInputChange}
                fullWidth
              />

              <MuiTelInput
                label="Телефон"
                name="phone"
                value={agent?.phone || ""}
                onChange={handlePhoneNumberChange}
                defaultCountry="RU"
                disableDropdown
                fullWidth
              />
            </Box>

            <Box display="flex" flexDirection="column" gap={2} width="50%">
              {/* NOTE: условие нужно для того, чтобы значение по умолчанию успевало загрузиться до рендеринга компонента, без условия оно не будет отображено даже после загрузки */}
              {formPurpose === "edit" &&
                agentTypeDropdownOptions.length > 0 &&
                agent && (
                  <Dropdown
                    options={agentTypeDropdownOptions}
                    onSelect={handleSelectChange}
                    placeholder="Тип"
                    defaultValue={String(agent?.agentTypeId)}
                  />
                )}

              {formPurpose === "add" &&
                agentTypeDropdownOptions &&
                agentTypeDropdownOptions.length > 0 && (
                  <Dropdown
                    options={agentTypeDropdownOptions}
                    onSelect={handleSelectChange}
                    placeholder="Тип"
                    defaultValue={agentTypeDropdownOptions[0].value}
                  />
                )}

              <TextField
                label="Имя директора"
                name="directorName"
                value={agent?.directorName || ""}
                onChange={handleInputChange}
                fullWidth
              />

              <NumberField
                label="КПП"
                name="KPP"
                value={agent?.KPP || ""}
                defaultValueOnEmpty={""}
                onChange={handleInputChange}
                fullWidth
              />

              <TextField
                label="E-mail"
                name="email"
                type="email"
                value={agent?.email || ""}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          </Box>
        </Box>
      </Collapsible>

      <Collapsible title="Продажи">
        <Box display="flex" flexDirection="column">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell variant="head">Название</TableCell>
                  <TableCell variant="head">Количество</TableCell>
                  <TableCell variant="head">Дата</TableCell>
                  <TableCell variant="head"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} sx={{ padding: 0 }}>
                    <Button
                      size="large"
                      variant="outlined"
                      color="primary"
                      onClick={handleOpenDialog}
                      fullWidth
                      sx={{ height: 50, borderRadius: 0 }}
                    >
                      +
                    </Button>
                  </TableCell>
                </TableRow>
                {agentSales.map((sale, index) => (
                  <TableRow key={index}>
                    <TableCell>{sale.product}</TableCell>
                    <TableCell>{sale.productCount}</TableCell>
                    <TableCell>
                      {dayjs(sale.date).format("DD.MM.YYYY")}
                    </TableCell>
                    <TableCell sx={{ width: 50 }}>
                      <IconButton
                        onClick={() => handleDeleteSale(index)}
                        aria-label="delete"
                      >
                        <Delete color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Collapsible>

      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setNewSale({
            product: "",
            productId: -1,
            productCount: 0,
            date: new Date(),
            source: SaleSource.LOCAL,
          });
        }}
      >
        <DialogTitle>Добавить продажу</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} width={400}>
            <Autocomplete
              options={products.map((product) => product.title)}
              value={newSale.product}
              onChange={(_, newValue) => {
                if (newValue) {
                  setNewSale({
                    ...newSale,
                    product: newValue || "",
                    productId: productTitleToProductId.get(newValue) ?? -1,
                  });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Название продукта"
                  margin="dense"
                  fullWidth
                  error={!newSale.product}
                  helperText={
                    !newSale.product ? "Пожалуйста, выберите продукт" : ""
                  }
                />
              )}
            />

            <Box display="flex" gap={2}>
              <NumberField
                label="Количество"
                name="productCount"
                value={newSale.productCount}
                onChange={(e) =>
                  setNewSale({
                    ...newSale,
                    productCount: parseInt(e.target.value) || 0,
                  })
                }
                error={newSale.productCount <= 0}
                helperText={
                  newSale.productCount <= 0 ? "Кол-во должно быть > 0" : ""
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Дата продажи"
                  value={dayjs(newSale.date)}
                  onChange={(newValue) => {
                    if (newValue) {
                      setNewSale({ ...newSale, date: newValue.toDate() });
                    }
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleAddSale}
            variant="text"
            color="primary"
            disabled={!newSale.product || newSale.productCount <= 0}
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgentForm;
