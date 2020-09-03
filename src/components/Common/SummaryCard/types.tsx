import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type Props = {
  data: {
    id: string;
    label: string;
    value: number;
    color: string;
    icon: IconDefinition;
  }[];
};
