import * as Yup from "yup";

export const registerSchema = Yup.object({
  fullName: Yup.string()
    .required("Tam ad gereklidir.")
    .min(3, "Tam ad en az 3 karakter olmalıdır."),
  email: Yup.string().required("E-posta gereklidir.").email("E-posta geçersiz."),
  password: Yup.string()
    .required("Şifre gereklidir.")
    .min(8, "Şifre en az 8 karakterli olmalıdır.")
    .max(18, "Şifre en fazla 18 karakterli olmalıdır.")
    /* .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
    ) */,
  confirmPassword: Yup.string()
    .required("Onay şifresi gereklidir.")
    .oneOf([Yup.ref("password"), null], "Şifreler aynı olmalıdır."),
});
