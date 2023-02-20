import GetK6 from "./scenarios/Get-Test.js";
import { group, sleep } from "k6";

export const options = {
  vus: 5,
  duration: '10s',
};

export default () => {
  group('Endpoint K6 - GET', () => {
    GetK6();
  });
  sleep(1); 

}