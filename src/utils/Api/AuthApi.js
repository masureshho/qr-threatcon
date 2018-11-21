import xhttp from 'xhttp';
import config from 'config';
export function fetchUser(id) {
  return xhttp({
    method: 'GET',
    url: `${config.api_host}/qrcode/checker.php?ticket_id=${id}`,
    timeout: 30 * 1000,
    withCredentials: true
  });
}

export function checkin({ ticketid }) {
  return xhttp({
    method: 'POST',
    url: `${config.api_host}/qrcode/checkin.php`,
    timeout: 30 * 1000,
    data: { ticketid },
    withCredentials: true
  });
}
