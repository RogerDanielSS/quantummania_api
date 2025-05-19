interface CardProps {
    numeroCard?: string;
    nivelCard?: string;
    descricaoCard?: string;
}
  
  export default function Card({ numeroCard, nivelCard, descricaoCard }: CardProps) {
    return (
      <div className="bg-[#664F4F]/50 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-black/30 w-full max-w-md mx-auto">
        <div>
          <p className="text-white text-lg md:text-xl">{numeroCard}</p>
        </div>
        
        <div className="pt-4 md:pt-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">
            {nivelCard}
          </h2>
          <div className="w-40 md:w-52 lg:w-60 h-1 bg-[#664F4F] mt-2" />
        </div>
        
        <div className="pt-4 md:pt-6 pb-6 md:pb-10">
          <p className="text-justify text-sm md:text-base">
            {descricaoCard}
          </p>
        </div>
      </div>
    );
  }