export type Link = { label: string; href: string };

export type Profile = {
  name: string;
  title: string;
  links: Link[];
};

export const profile: Profile = {
  name: "Jack Winter",
  title: "Software engineer",
  links: [{ label: "GitHub", href: "https://github.com/j4ckwinter" }],
};
