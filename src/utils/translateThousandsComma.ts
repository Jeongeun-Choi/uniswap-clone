interface Props {
  value: number;
  locales?: string | string[];
}
function translateThousandsComma({ value, locales = "en-US" }: Props) {
  return value.toLocaleString(locales);
}

export default translateThousandsComma;
