import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const FilterIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M24.875 1.375H1.125L10.625 12.5431V20.2639L15.375 22.625V12.5431L24.875 1.375Z"
        stroke="#205284"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
    </SvgIcon>
  );
};

export default FilterIcon;
