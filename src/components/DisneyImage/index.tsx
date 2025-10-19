import disneyImage from "@/assets/disney-plus-logo.webp";

const DisneyImage = ({
  className,
  device,
}: {
  className: string;
  device: "mobile" | "desktop";
}) => {
  return (
    <img
      src={disneyImage}
      alt="Disney+"
      className={className}
      loading="eager"
      decoding="async"
      data-testid={`disney-image-${device}`}
    />
  );
};

export default DisneyImage;
