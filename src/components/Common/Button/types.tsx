export type Props = {
  block?: boolean;
  href?: string;
  htmlType: 'button' | 'submit' | 'reset' | undefined;
  icon?: React.ReactChild;
  label?: string;
  loading?: boolean | { delay: number };
  type?:
    | 'link'
    | 'text'
    | 'default'
    | 'ghost'
    | 'primary'
    | 'dashed'
    | undefined;
  shape?: 'circle' | 'round' | undefined;
  size?: 'large' | 'small';
};
