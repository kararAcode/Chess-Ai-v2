/**
 * Manages the state of the application and handles state transitions with event notifications.
 */
class StateManager {
    /**
     * Constructs a new StateManager instance.
     * @param {string} initialState - The initial state of the application.
     */
    constructor(initialState) {
        this.state = initialState;
        this.events = {};
    }

    /**
     * Registers a listener for a specific event.
     * @param {string} event - The name of the event to listen for.
     * @param {Function} listener - The callback function to execute when the event is emitted.
     */
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    /**
     * Emits an event and calls all registered listeners with the provided options.
     * @param {string} event - The name of the event to emit.
     * @param {Object} options - The data to pass to the event listeners.
     */
    emit(event, options) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(options));
    }

    /**
     * Gets the current state of the application.
     * @returns {string} The current state of the application.
     */
    getState() {
        return this.state;
    }

    /**
     * Sets the state of the application and emits an event for the new state.
     * @param {string} state - The new state to set.
     * @param {Object} [options={}] - Additional data to pass to the event listeners.
     */
    setState(state, options = {}) {
        this.state = state;
        this.emit(state, options);
    }
}

export default StateManager;
