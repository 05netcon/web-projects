export default class Cinema {

    #name; #halls;
    constructor(name) {
        this.#name = name;
        this.#halls = [];
    };
    get name() {
        return this.#name;
    };
    set name(name) {
        this.#name = name;
    };
    get count() {
        return this.#halls.length;
    };
    getHall(name) {
        for (let i = 0; i < this.#halls.length; i++) {
            if (this.#halls[i].name === name) {
                return this.#halls[i];
            };
        };
    };
    addHall(name, rows, cols) {
        let newHall = new Hall(name, rows, cols);
        this.#halls.push(newHall);
    };
    removeHall(name) {
        for (let i = 0; i < this.#halls.length; i++) {
            if (this.#halls[i].#name === name) {
                this.#halls.splice(i, 1);
                break;
            };
        };
    };

};


class Hall {

    #name; #rows; #columns; #count; #sessions;
    constructor(name, rows, columns) {
        this.#name = name;
        this.#rows = rows;
        this.#columns = columns;
        this.#count = this.#getCount();
        this.#sessions = [];
    };
    get name() {
        return this.#name;
    };
    set name(name) {
        this.#name = name;
    };
    get count() {
        return this.#count;
    };
    get columns() {
        return this.#columns;
    };
    get rows() {
        return this.#rows;
    };
    #getCount() {
        return this.#rows * this.#columns;
    };
    getSession(name) {
        for (let i = 0; i < this.#sessions.length; i++) {
            if (this.#sessions[i].name === name) {
                return this.#sessions[i];
            };
        };
    };
    addSession(name, start, duration) {
        let newSession = new Session(this, name, start, duration);
        this.#sessions.push(newSession);
    };
    removeSession(name) {
        for (let i = 0; i < this.#sessions.length; i++) {
            if (this.#sessions[i].#name === name) {
                this.#sessions.splice(i, 1);
                break;
            };
        };
    };

};


class Session {

    #hall; #name; #start; #duration; #seats;
    constructor(hall, name, start, duration) {
        this.#hall = hall;
        this.#name = name;
        this.#start = start;
        this.#duration = duration;
        this.#seats = [];
        this.#initSeats();
    };
    get name() {
        return this.#name;
    };
    set name(name) {
        this.#name = name;
    };
    get start() {
        return this.#start;
    };
    set start(start) {
        this.#start = start;
    };
    get duration() {
        return this.#duration;
    };
    set duration(duration) {
        this.#duration = duration;
    };
    getSeat(row, col) {
        for (let i = 0; i < this.#seats.length; i++) {
            if (this.#seats[i].row === row && this.#seats[i].column === col) {
                return this.#seats[i];
            };
        };
    };
    drawSeats() {
        const PADDING = 10;
        let buttonWidth = 0;
        let buttonHeight = 0;
        let containerSize = 0;
        let cols = this.#hall.columns;
        let rows = this.#hall.rows;
        let container = document.getElementById('container');
        // Container has to be empty before drawing seats
        container.innerHTML = '';
        if (window.innerHeight <= window.innerWidth) {
            containerSize = window.innerHeight - PADDING;
        } else {
            containerSize = window.innerWidth - PADDING;
        };
        container.style.height = containerSize + 'px';
        container.style.width = containerSize + 'px';
        // To center container vertically its margin has to be 'margin: XXpx auto',
        // where XX is the difference of window and container heights devided by two.
        // Besides there is a 10px (5px up and 5px down) padding in container so we
        // have to substract the padding too.
        container.style.margin = (window.innerHeight - containerSize - PADDING) / 2 + 'px auto';
        buttonHeight = (containerSize - rows * PADDING) / rows;
        buttonWidth = (containerSize - cols * PADDING) / cols;
        for (let row = 1; row <= rows; row++) {
            for (let column = 1; column <= cols; column++) {
                let button = document.createElement('button');
                button.style.width = buttonWidth + 'px';
                button.style.height = buttonHeight + 'px';
                button.textContent = String(column);
                container.appendChild(button);
                let currentSeat = this.getSeat(row, column);
                button.addEventListener('click', e => {
                    switch (currentSeat.state) {
                        case Status.FREE:
                            e.target.style.backgroundImage = 'url(images/armchair-yellow.png)';
                            e.target.style.color = 'black';
                            currentSeat.state = Status.RESERVED;
                            break;
                        case Status.RESERVED:
                            e.target.style.backgroundImage = 'url(images/armchair-blue.png)';
                            e.target.style.color = 'white';
                            currentSeat.state = Status.OCCUPIED;
                            break;
                        case Status.OCCUPIED:
                            e.target.style.backgroundImage = 'url(images/armchair-red.png)';
                            e.target.style.color = 'white';
                            currentSeat.state = Status.FREE;
                            break;
                    };
                });
            }; 
        };
    };
    #initSeats() {
        for (let row = 1; row <= this.#hall.rows; row++) {
            for (let column = 1; column <= this.#hall.columns; column++) {
                let newSeat = new Seat(row, column);
                this.#seats.push(newSeat);
            };
        };
    };
    
};


class Seat {

    #row; #column; #state;
    constructor(row, column) {
        this.#row = row;
        this.#column = column;
        this.#state = Status.FREE;
    };
    get row() {
        return this.#row;
    };
    get column() {
        return this.#column;
    };
    get state() {
        return this.#state;
    };
    set state(status) {
        this.#state = status;
    };

};


class Status {

    static FREE = 0;
    static RESERVED = 1;
    static OCCUPIED = 2;

};