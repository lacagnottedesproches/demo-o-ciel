import {
  AccountAndPotCreated,
  Category,
  Country,
  PayloadAccountAndPot,
  useLCDP,
} from "@lacagnottedesproches/lcdp-js";
import { FormEvent, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import AsyncSelect from "react-select/async";
import BannerLCDP from "../BannerLCDP";

type SelectItem = {
  value: string;
  label: string;
};

const FormAccountPot = () => {
  const { lcdp } = useLCDP();

  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [processingRequest, setProcessingRequest] = useState<boolean>(false);

  const loadOptionsCountries = () => {
    /**
     * Load LCDP available countries
     */
    return new Promise<SelectItem[]>(async (resolve) => {
      if (!lcdp) {
        return;
      }
      const items = await lcdp?.getAvailableCountries();
      if (items) {
        const formatted = items.map((c: Country) => {
          return {
            value: c.id,
            label: c.name,
          };
        });

        resolve(formatted);
      }
    });
  };

  const loadOptionsCategoriess = () => {
    /**
     * Load LCDP available categories
     */
    return new Promise<SelectItem[]>(async (resolve) => {
      if (!lcdp) {
        return;
      }
      const items = await lcdp?.getCategories();
      if (items) {
        const formatted = items.map((c: Category) => {
          return {
            value: c.id,
            label: c.name,
          };
        });

        resolve(formatted);
      }
    });
  };

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!lcdp) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    if (!birthDate || !countryCode || !categoryId) {
      return;
    }
    const payload = {
      ...data,
      birth_date: birthDate,
      country_code: countryCode,
      category_id: categoryId,
    };

    try {
      setProcessingRequest(true);
      const token = await lcdp.createTokenAccountAndPot(
        payload as PayloadAccountAndPot,
      );
      // Here we do a request to the backend. Then the backend will call the LCDP API.
      const response = await fetch("/api/wizards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      });
      const data: AccountAndPotCreated = await response.json();
      if (data && data.pot && data.pot.pot_id) {
        alert("Compte Cagnotte créé avec succès !");
      }
    } catch (error) {
      alert(`Une erreur est survenue. ${error}`);
    } finally {
      setProcessingRequest(false);
    }
  };

  return (
    <div className="bg-white drop-shadow p-5 rounded">
      <form className="w-full flex flex-col gap-5" onSubmit={handleOnSubmit}>
        <fieldset className="flex flex-col gap-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <input
              className="border px-2 py-3 rounded w-full"
              name="first_name"
              placeholder="Prénom"
              disabled={processingRequest}
              required
            />
            <input
              className="border px-2 py-3 rounded w-full"
              name="last_name"
              placeholder="Nom"
              disabled={processingRequest}
              required
            />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-gray-400">{"Date de naissance"}</p>
            <DatePicker
              name="birth_date"
              disabled={processingRequest}
              locale="fr-FR"
              value={birthDate}
              required
              onChange={(newValue) => setBirthDate(newValue as Date)}
            />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <input
              className="col-span-2 border px-2 py-3 rounded w-full"
              name="address"
              placeholder="Adresse"
              required
              disabled={processingRequest}
            />
            <input
              className="border px-2 py-3 rounded w-full"
              name="postcode"
              placeholder="Code postal"
              required
              disabled={processingRequest}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-center">
            <input
              className="col-span-2 border px-2 py-3 rounded w-full"
              name="city"
              placeholder="Ville"
              required
              disabled={processingRequest}
            />
            {lcdp ? (
              <AsyncSelect
                id="country_code"
                name="country_code"
                loadOptions={loadOptionsCountries}
                placeholder={"Pays"}
                isDisabled={processingRequest}
                cacheOptions
                defaultOptions
                required
                onChange={(newValue) => {
                  if (newValue) {
                    setCountryCode(newValue.value);
                  }
                }}
              />
            ) : null}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <PhoneInput
            className="col-span-2 border px-2 py-3 rounded w-full"
            required
            name="phone_number"
            country="FR"
            international
            defaultCountry="FR"
            disabled={processingRequest}
            countryCallingCodeEditable={false}
            placeholder="Numéro de téléphone"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <input
            className="border px-2 py-3 rounded w-full"
            name="name"
            placeholder="Nom de la cagnotte"
            required
            disabled={processingRequest}
          />
          {lcdp ? (
            <AsyncSelect
              id="category_id"
              isDisabled={processingRequest}
              loadOptions={loadOptionsCategoriess}
              placeholder={"Catégorie"}
              cacheOptions
              defaultOptions
              required
              onChange={(newValue) => {
                if (newValue) {
                  setCategoryId(newValue.value);
                }
              }}
            />
          ) : null}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <input
              className="border px-2 py-3 rounded w-full"
              type="email"
              name="email"
              placeholder="Email"
              disabled={processingRequest}
              required
            />
            <input
              className="border px-2 py-3 rounded w-full"
              type="password"
              name="password"
              placeholder="Password"
              disabled={processingRequest}
              required
            />
          </div>
        </fieldset>

        <button
          type="submit"
          className="bg-yellow-500 text-white font-bold w-full px-3 py-2 rounded"
          disabled={processingRequest}
        >
          {processingRequest ? (
            <span>...</span>
          ) : (
            <span>{"Créer le compte cagnotte"}</span>
          )}
        </button>
      </form>

      <BannerLCDP />
    </div>
  );
};

export default FormAccountPot;
