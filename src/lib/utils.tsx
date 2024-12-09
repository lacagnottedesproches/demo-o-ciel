export const CATEGORIE_OBSEQUE = "f7d260f3-aa13-48d9-9135-23bae85291be";

export type FormatCurrencyOptions = {
  locale?: string;
  currency?: string;
  maxFD?: number;
};

export const formatCurrency = (
  nb: number,
  options: FormatCurrencyOptions = {},
) => {
  const { locale = "fr-FR", currency = "EUR", maxFD = 2 } = options;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: maxFD,
    minimumFractionDigits: 0,
  }).format(nb);
};

export const generateTemporaryPassword = () => {
  // https://stackoverflow.com/questions/1497481/javascript-password-generator
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

export const generateFakeUserData = () => {
  return {
    email: `john.doe+${Math.round(new Date().getTime())}@gmail.com`,
    password: generateTemporaryPassword(),
    first_name: "John",
    last_name: "Doe",
    birth_date: new Date(1986, 10, 12),
    address: "2 rue Eugene Spuller",
    postcode: "75003",
    city: "Paris",
    phone_number: "+330650515257",
    country_code: "fr",
  };
};

export const generateFakePotData = () => {
  return {
    name: `Cagnotte ${new Date().getTime()}`,
    category_id: CATEGORIE_OBSEQUE,
  };
};
