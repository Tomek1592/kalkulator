import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SummaryCardProps {
  data: {
    id: string;
    label: string;
    value: number;
    color: string;
    icon: IconDefinition;
  }[];
}
