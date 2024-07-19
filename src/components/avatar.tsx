type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={picture}
        className="w-12 h-12 rounded-full mr-4"
        alt={name}
        width={48}
        height={48}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default Avatar;
