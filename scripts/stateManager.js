class StateManager {
    constructor(initalState) {
        this.state = initalState;
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(listener);
    }

    emit(event, options) {
        if (!this.events[event]) return;

        this.events[event].forEach(listener => listener(options));
    }

    getState() { 
        return this.state
    }

    setState(state, options={}) {
        this.state = state;
        this.emit(state, options);
    }



}

export default StateManager;