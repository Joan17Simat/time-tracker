import axios from "./axiosConfig";

export const targetIp = "https://api-test.sesametime.com/schedule/v1"

function get(endpoint, params) {
  return axios
    .get(`${targetIp}/${endpoint}`, {
      params,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
}

function post(endpoint, params) {
  return axios
    .post(`${targetIp}/${endpoint}`, params)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
}
// <--------------------------------------------------------------------------- GET -------------------------------------------------------------------------->

/**
 * The workStatus field tells us if the employee is on file
    (online), desfichado (offline) or paused (paused).
    With workEntryIn we can know how long it takes
    working the user if he is online.
 */
export function getWorkerStatus() {
  return get("work-entries");
}



// <-------------------------------------------------------------------------- POST -------------------------------------------------------------------------->

/**
 * Clock in at work
 * @param {String} employeeId Id of actual employee
 * @param {Object} workEntryIn Data coordinates
 * 
 */
export function clockIn(employeeId) {
  return post("work-entries/clock-in", { employeeId });
}

/**
 * Clock out at work
 * @param {String} employeeId Id of actual employee
 * @param {Object} workEntryOut Data coordinates
 */
 export function clockOut(employeeId) {
  return post("work-entries/clock-out", { employeeId });
}
