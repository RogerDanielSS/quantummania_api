import CardComunidade from "./components/cardComunidade";
import Card from "./components/cardTutorial";
import Header from "./components/header";
import MembroEquipe from "./components/membroEquipe";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[url('/background-landingpage.jpg')] bg-cover bg-center bg-no-repeat">
        <Header/>
        <h1 className="text-[100px] text-white text-center pt-[325px] text-stroke">
          Quantummania
        </h1>
        <h2 className="text-white text-justify font-light leading-relaxed tracking-wide max-w-lg ml-auto mr-20 mt-12 px-4 text-[18px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Pellentesque pharetra semper mollis. Fusce tortor neque, 
            malesuada rhoncus tortor sed, ullamcorper malesuada quam. 
            Etiam aliquet enim leo, eget euismod arcu ultricies nec. 
            Etiam accumsan pretium odio vitae sodales. 
            Fusce hendrerit mollis eros nec vehicula.
        </h2>
      </div>
      <div>
        <div>
          <h1 className="text-white text-[40px] pt-6 pl-4 mb-0">
            Tutorial
          </h1>
          <div className="w-64 h-px bg-white my-4 mt-0 pb-0.5 mb-6 ml-4"></div>
        </div>
        <div className="w-full bg-[url('/background-tutorial.png')] bg-cover bg-center bg-no-repeat rounded-lg">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 p-6 md:p-8 lg:p-10">
            <Card 
              numeroCard="01" 
              nivelCard="Básico" 
              descricaoCard="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Pellentesque pharetra semper mollis. Fusce tortor neque, 
                            malesuada rhoncus tortor sed, ullamcorper malesuada quam."
            />
            <Card 
              numeroCard="02" 
              nivelCard="Intermediário" 
              descricaoCard="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Pellentesque pharetra semper mollis. Fusce tortor neque, 
                            malesuada rhoncus tortor sed, ullamcorper malesuada quam."
            />
            <Card 
              numeroCard="03" 
              nivelCard="Avançado" 
              descricaoCard="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Pellentesque pharetra semper mollis.Fusce tortor neque, 
                            malesuada rhoncus tortor sed, ullamcorper malesuada quam."
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-white text-[40px] pt-6 pl-4 mb-0">
          Feitos pela comunidade
        </h1>
        <div className="w-128 h-px bg-white my-4 mt-0 pb-0.5 mb-6 ml-4"></div>
      </div>
      <div>
        <div className="bg-[radial-gradient(circle_at_top_right,_#35546E_0%,_#374F66_70%,_#3E3F4C_100%)] ml-10 mr-10 rounded-lg">
          <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <CardComunidade tituloCard="Chips Quânticos" backgroundImage="/chips-quanticos.jpg" descricaoCard="Lorem ipsum dolor sit amet..."/>
              <CardComunidade tituloCard="Inteligência Artificial" backgroundImage="/inteligencia-artificial.png" descricaoCard="Lorem ipsum dolor sit amet..."/>
              <CardComunidade tituloCard="Ciência Quântica" backgroundImage="/ciencia-quantica.png" descricaoCard="Lorem ipsum dolor sit amet..."/>
              <CardComunidade tituloCard="Exploração Espacial" backgroundImage="/exploracao-espacial.jpg" descricaoCard="Lorem ipsum dolor sit amet..."/>
            </div>
            <div className="flex justify-center">
              <div className="bg-[radial-gradient(circle_at_right,_#121F2F_44%,_#50A1E4_100%)] text-center border-t border-gray-600 text-white w-64 p-2 rounded-lg">
                <p className="font-bold">Saiba mais</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-white text-[40px] pt-6 pl-4 mb-0">
          Quem somos nós
        </h1>
        <div className="w-128 h-px bg-white my-4 mt-0 pb-0.5 mb-6 ml-4"></div>
      </div>
      <div className="bg-[radial-gradient(circle_at_top_right,_#35546E_0%,_#374F66_70%,_#3E3F4C_100%)] ml-10 mr-10 rounded-lg grid grid-cols-4">
        <MembroEquipe nomeMembro="Estêvão" githubUrl="https://github.com/Txtravos" linkedinUrl="https://www.linkedin.com/in/estevaoviana/"/>
        <MembroEquipe nomeMembro="Guilherme" githubUrl="https://github.com/Txtravos" linkedinUrl="https://www.linkedin.com/in/estevaoviana/"/>
        <MembroEquipe nomeMembro="John" githubUrl="https://github.com/Txtravos" linkedinUrl="https://www.linkedin.com/in/estevaoviana/"/>
        <MembroEquipe nomeMembro="Jonathan" githubUrl="https://github.com/Txtravos" linkedinUrl="https://www.linkedin.com/in/estevaoviana/"/>
        <MembroEquipe nomeMembro="Leticia" githubUrl="https://github.com/Txtravos" linkedinUrl="https://www.linkedin.com/in/estevaoviana/"/>
        <MembroEquipe nomeMembro="Roger" githubUrl="https://github.com/RogerDanielSS" linkedinUrl="https://www.linkedin.com/in/estevaoviana/"/>
        <MembroEquipe nomeMembro="Thiago" githubUrl="https://github.com/Txtravos" linkedinUrl="https://www.linkedin.com/in/estevaoviana/"/>
        <MembroEquipe nomeMembro="Vinícius" githubUrl="https://github.com/Txtravos" linkedinUrl="https://www.linkedin.com/in/estevaoviana/"/>
      </div>
    </>
  );
}