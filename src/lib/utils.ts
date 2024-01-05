import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// generates an excerpt from html
export function makeExcerpt(htmlContent: string): string {
  const maxLength = 50;
  const textContent = htmlContent.replace(/<[^>]*>/g, '');

  const truncatedText =
    textContent.length > maxLength
      ? textContent.slice(0, maxLength - 3) + "..."
      : textContent;

  return truncatedText;
}

// generate random string of x length
export function makeRandomId(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// turn "John Smith" into  "John", etc..
export function getFirstName(fullname: string) {
  if (!fullname) return null;
  if (fullname.indexOf(" ") > -1) {
    return fullname.substring(0, fullname.indexOf(" "));
  }
  return fullname;
}

// turns "John Smith" into "JS", etc...
export function getInitials(name: any) {
  if (!name) return null;
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

  let initials = [...name.matchAll(rgx)] || [];

  initials = (
    (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
  ).toUpperCase();

  return initials;
}

// formats currency
export const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
