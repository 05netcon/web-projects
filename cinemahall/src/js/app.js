import Cinema from "./CinemaHall.js";

let newCinema = new Cinema('Hayal');
newCinema.addHall('BlueHall', 8, 8);
newCinema.addHall('RedHall', 8, 8);
let blueHall = newCinema.getHall('BlueHall');
blueHall.addSession('Thor Ragnarok', '13.12.2021 17:35', 120);
let thorSession = blueHall.getSession('Thor Ragnarok');

let currentSeat = thorSession.getSeat(2 ,2);
console.log(currentSeat.state);

window.addEventListener('load', function() {
    thorSession.drawSeats();
});
window.addEventListener('resize', function() {
    thorSession.drawSeats();
    console.log(currentSeat.state);
});
