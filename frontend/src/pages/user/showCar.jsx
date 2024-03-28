export default function ShowCar(props) {
  const carData = props.carData;
  return (
    <>
        {carData ? (
          <div className="flex justify-center bg-base-content  flex-col ">
            <div className="flex justify-center bg-base-content gap-5">
              <div>
                <strong>Brand: </strong>
                <p className="badge badge-accent badge-outline p-5 mx-2">
                  {carData.information.brand}
                </p>
              </div>
              <div>
                <strong>Model: </strong>
                <p className="badge badge-accent badge-outline p-5 mx-2">
                  {carData.information.model}
                </p>
              </div>
              <div>
                {" "}
                <strong>VIN: </strong>
                <p className="badge badge-accent badge-outline p-5 mx-2">
                  {carData.information.vin}
                </p>
              </div>
              <div>
                <strong>Year: </strong>
                <p className="badge badge-accent badge-outline p-5 mx-2">
                  {carData.information.year}
                </p>
              </div>
              <div>
                <strong>Battery state: </strong>
                {carData.chargeState.batteryLevel>70?(
                    <p className="badge badge-accent badge-outline p-5 mx-2">
                      {carData.chargeState.batteryLevel}
                   </p>
                    ):(
                    <p className="badge badge-error badge-outline p-5 mx-2">
                      {carData.chargeState.batteryLevel}
                   </p>
                    )
                }
              </div>
            </div>
          </div>  
        ) :null }
    </>
  );
}
