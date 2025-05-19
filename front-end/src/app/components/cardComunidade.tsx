interface CardProps {
    backgroundImage?: string;
    tituloCard?: string;
    descricaoCard?: string;
  }
  
  export default function CardComunidade({ backgroundImage, tituloCard, descricaoCard }: CardProps) {
    return (
      <div
        className="p-6 rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="pr-20 pt-20">
            <h2 className="text-xl font-semibold mb-3 text-white">{tituloCard}</h2>
            <div className="w-32 h-px bg-[#CE9972] my-4 mt-0 pb-1 mb-6"></div>
            <p className="text-white">{descricaoCard}</p>
        </div>
      </div>
    );
  }
  