interface IFlagCountry {
  altSpellings: any[];
  demonym: string;
  flag: string;
  iso2: string;
  iso3: string;
  name: string;
}

declare module 'country-flags-svg' {
  let countries: IFlagCountry[];
}
