import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Map } from "./Map";

export const MapView = () => {
  return (
    <Wrapper apiKey={"AIzaSyDvC9zUdm6tBSXy_joQjZpmvmmWde7unpc"}>
      <Map />
    </Wrapper>
  )
};
