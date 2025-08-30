import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
  type: Yup.string().required("Type is required"),
  tagNo: Yup.string().required("Tag No is required"),
  productName: Yup.string().required("Product Name is required"),
  remark: Yup.string().nullable(), // optional
  purity: Yup.number()
    .typeError("Purity must be a number")
    .required("Purity is required")
    .min(1, "Purity must be greater than 0"),
  piece: Yup.number()
    .typeError("Piece must be a number")
    .required("Piece is required")
    .min(1, "At least 1 piece is required"),
  grossWeightInGrams: Yup.number()
    .typeError("Gross Weight must be a number")
    .required("Gross Weight is required")
    .positive("Gross Weight must be greater than 0"),
  netWeightInGrams: Yup.number()
    .typeError("Net Weight must be a number")
    .required("Net Weight is required")
    .positive("Net Weight must be greater than 0"),
  lessWeightInGrams: Yup.number()
    .typeError("Less Weight must be a number")
    .min(0, "Less Weight cannot be negative")
    .required("Less Weight is required"),
  rate: Yup.number()
    .typeError("Rate must be a number")
    .required("Rate is required")
    .positive("Rate must be greater than 0"),
  stoneRate: Yup.number()
    .typeError("Stone Rate must be a number")
    .min(0, "Stone Rate cannot be negative")
    .required("Stone Rate is required"),
  value: Yup.number()
    .typeError("Value must be a number")
    .required("Value is required")
    .min(0, "Value cannot be negative"),
  labourChargesInPercentage: Yup.number()
    .typeError("Labour % must be a number")
    .min(0, "Labour % cannot be negative")
    .required("Labour % is required"),
  labourChargeInRupees: Yup.number()
    .typeError("Labour Charge must be a number")
    .min(0, "Labour Charge cannot be negative")
    .required("Labour Charge is required"),
  finalAmount: Yup.number()
    .typeError("Final Amount must be a number")
    .required("Final Amount is required")
    .min(0, "Final Amount cannot be negative"),
  additionalAmount: Yup.number()
    .typeError("Additional Amount must be a number")
    .min(0, "Additional Amount cannot be negative")
    .required("Additional Amount is required"),
  discountAmount: Yup.number()
    .typeError("Discount must be a number")
    .min(0, "Discount cannot be negative")
    .required("Discount is required"),
});
