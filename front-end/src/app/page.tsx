import Header from "./components/header";

export default function Home() {
  return (
    <div className="">
      <Header/>
      <h1 className="absolute p-[10px] gap-[10px] text-[100px] text-center bg-[url('/background-landingpage.jpg')]"
          style={{
            width: "857.7px",
            height: "192.89px",
            top: "325px",
            left: "311.93px"
          }}>
          Quantummania
      </h1>
    </div>
  );
}
