import * as Yup from "yup";

export const footerSchema = Yup.object({
  location: Yup.string().required("Konum gereklidir."),
  phoneNumber: Yup.string()
    .required("Telefon numarası gereklidir.")
    .min(10, "Telefon numarası en az 10 karakterli olmalı"),
  email: Yup.string().required("E-posta gerkelidir").email("E-posta geçersiz."),
  desc: Yup.string().required("Açıklama gereklidir."),
  day: Yup.string().required("Gün gereklidir."),
  time: Yup.string().required("Zaman gereklidir."),
});
