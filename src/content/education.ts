import type { IconName } from "../icons";

export type Qualification = {
  qualification: string;
  institution: string;
  icon: IconName;
  start: string;
  end: string;
};

export const education: Qualification[] = [
  {
    qualification: "BSc Computer Science, 2:1",
    institution: "University of the West of England",
    icon: "school",
    start: "2013",
    end: "2017",
  },
];
