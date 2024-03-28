import Navbar from "../../componet/Navbar.jsx";
import logo2 from "../../assets/img/gas1.jpg";
import logo1 from "../../assets/img/electric.jpg";
import stat1 from "../../assets/statics/charging-curve-final-jpg.webp";
import img1 from "../../assets/img/RT50-EXPLODE.2-2-dc fast charger.jpg";
import img2 from "../../assets/img/electric.jpg";
export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <div>
        <div className="diff aspect-[4/3]">
          <div className="diff-item-1">
            <img alt="electric car charging stations" src={logo2} />
          </div>
          <div className="diff-item-2">
            <img alt="gasoline stations" src={logo1} />
          </div>
          <div className="diff-resizer"></div>
        </div>
      </div>

      <div className="h-screen">
        <h1 className="text-5xl font-bold justify-center flex m-10">Problem</h1>

        <div className="flex gap-4 w-11/12 mt-10 ml-5 overflow-auto ">
          <div className=" h-32 w-full ">
            <img src={stat1} alt="graph of soc and power useage" />
            <p>
              source
              &quot;https://www.gridserve.com/2023/02/17/what-is-an-electric-car-charging-curve/&quot;{" "}
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="text-xl font-bold underline">
              The Charging speed
            </div>
            <div className="mt-5">
              The Charging speed is the critical and the most concerning factor
              to consider. But increasing the charging speed is very costy and
              space taking, if we plant Dc fast charger since it needs better
              rectifier than the one inside the electric car. So how do we
              increse the carging speed of electric vehicles cost effectivly?
              The answer is <span className="text-accent">Accessibility. </span>
              Slow charging stations are generally more affordable and easier to
              install than fast chargers. By having more slow charging stations,
              EV owners may have better accessibility, especially in residential
              areas where fast chargers may not be as practical.
            </div>
            <div className="bg-gray-800 pt-5 p-2">
              As we can see in the graph, As the battery SoC(state of charge)
              increases, the charging speed tends to decrease. The charging
              curve is not linear; it may start fast and gradually slow down as
              the battery approaches a higher SoC. So the best move is to charge
              your electric car from 20% to 80% everytime. so have electric car
              charging station everywhere is very nice to have And since slow
              (level 1) charger every where helpes out on this.
            </div>
          </div>
        </div>

        <div className="divider "></div>

        <div className="flex gap-4 w-11/12  ml-5 overflow-auto">
          <div className=" h-32 w-full ">
            <img src={img1} alt="graph of soc and power useage" />
            <p>
              source &quot;https://tritiumcharging.com/product/rt-50/&quot;{" "}
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="text-xl font-bold underline">The Cost</div>
            <div className="mt-5">
              Charging stations are generaly expensive, thus harder to build and
              install a station. The cost of owning and operating an electric
              vehicle (EV) charging station can vary based on several factors
              <span className="text-accent block text-xl my-1">
                {" "}
                Type of Charging Station
              </span>
              <span className="text-cyan-200 underline">
                Level 1 Charger (Slow Charger)
              </span>
              <p>
                These chargers are typically less expensive than higher-level
                chargers. Level 1 chargers use a standard 120-volt household
                outlet and are often included with the purchase of an electric
                vehicle.
              </p>
              <div className="divider divider-accent my-1"></div>
              <span className="text-cyan-200 underline">
                Level 2 Charger (Fast Charger)
              </span>
              <p>
                Level 2 chargers require a 240-volt power supply and are faster
                than Level 1. Costs include the charger unit, installation, and
                potential electrical upgrades.
              </p>
              <div className="divider divider-accent my-1"></div>
              <span className="text-cyan-200 underline">DC fast Charger</span>
              <p>
                High-power DC fast chargers provide rapid charging and are
                commonly found at public charging stations. They are more
                expensive than Level 2 chargers and often require specialized
                installation.
              </p>
              <span className="text-accent block text-xl ">
                Installation Costs
              </span>
              <p>
                Installation costs can be a significant portion of the total
                expense. Factors such as electrical infrastructure, distance
                from the power source, and any necessary upgrades to support the
                charging station contribute to installation costs.
              </p>
            </div>
            <div className="bg-gray-800 pt-5 p-2">
              This is all to say that its hard and difficult to build a fast and
              best electric car charging staions and so we need more small cost
              effective slow charger everywhere and make it so that every one
              can afford it to sell to the public{" "}
            </div>
          </div>
        </div>

        <div className="divider divider-accent "></div>

        <h1 className="text-5xl font-bold justify-center flex m-10">
          The Answer
        </h1>
        <div className="flex gap-4 w-11/12  mt-20 ml-5">
          <div className=" h-32 w-full ">
            <img src={img2} alt="graph of soc and power useage" />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="text-xl font-bold underline">
              Cheap And Accessibility
            </div>
            <div className="mt-5"></div>
            <div className="bg-gray-800 pt-5 p-2">
              This is all to say that its hard and difficult to build a fast and
              best electric car charging staions and so we need more small cost
              effective slow or midium speed charger everywhere and make it so that every one
              can afford it to sell to the public
              As our country is moving towards sustainable energy, we need to support that,help contribute to that by adding electric car charger.
            </div>
            Helping people to adapt using eletric cars.
          </div>
        </div>
      </div>
    </div>
  );
}
