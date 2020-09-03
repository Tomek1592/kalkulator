export type Props = {
  block?: boolean;
  children: React.ReactNode | React.ReactNode[];
  href?: string;
  htmlType: 'button' | 'submit' | 'reset' | undefined;
  icon?: React.ReactNode;
  loading?: boolean | { delay: number };
  onClick?: () => void;
  shape?: 'circle' | 'round' | undefined;
  size?: 'large' | 'middle' | 'small';
  type?:
    | 'link'
    | 'text'
    | 'default'
    | 'ghost'
    | 'primary'
    | 'dashed'
    | undefined;
};
