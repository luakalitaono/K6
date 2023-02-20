import http from "k6/http";
import { Trend, Rate, Counter, Gauge } from "k6/metrics";
import { check, fail, sleep } from "k6";

export let GetDuration = new Trend('get_k6_duration');
export let GetFailRate = new Rate('get_k6_fail_rate');
export let GetSuccessRate = new Rate('get_k6_success_rate');
export let GetReqs = new Counter('get_k6_reqs');

export default function () {
  let res = http.get('http://test.k6.io')

  GetDuration.add(res.timings.duration);
  GetReqs.add(1);
  GetFailRate.add(res.status == 0 || res.status > 399);
  GetSuccessRate.add(res.status < 399);

  let durationMsg = 'Max Duration ${1000/1000}s'
  if(!check(res, {
    'max duration': (r) => r.timings.duration < 1000,
  })){
    fail(durationMsg);
  }
  sleep(1);
}
