const maxToMin = (a, b) => b - a;

module.exports = () => {
    const state = {
        queues: new Map(),
        auto: { queueIndex: null, left: 0 },
        queue_size: 0,
    };

    //! CHECKS
    const isQueueEmpty = priority =>
        state.queues.get(priority).length === 0;
    const isQueueIndexInvalid = () =>
        state.auto.queueIndex > state.queues.size
        || state.auto.queueIndex === null;
    const isQueueConsumed = () =>
        state.auto.left === 0;

    //! MUTATIONS
    const nextElement = () =>
        Object.assign(state.auto, { left: state.auto.left - 1 });
    const newQueue = (left, queueIndex) =>
        Object.assign(state.auto, { left: left, queueIndex });

    //! CORE    
    const getIndexPriority = queueIndex => {
        const priorites = Array.from(state.queues.keys()).sort(maxToMin);
        return priorites[queueIndex] || priorites[0];
    };

    const consume = (queueIndex, mutator) => {
        const priority = getIndexPriority(queueIndex);
        if (isQueueEmpty(priority)) {
            newQueue(0, queueIndex);
            return getAutoPriority();
        }
        mutator(priority, queueIndex);
        return priority;
    }

    const getAutoPriority = () => {
        if (isQueueIndexInvalid()) {
            return consume(0, newQueue);
        } else if (isQueueConsumed()) {
            return consume(state.auto.queueIndex + 1, newQueue);
        } else {
            return consume(state.auto.queueIndex, nextElement);
        }
    };
    //! API
    return {
        push: (priority, data) => {
            state.queue_size++;
            const queue = state.queues.get(priority);
            if (queue === undefined) state.queues.set(priority, [data]);
            else queue.unshift(data);
        },
        pop: () => {
            if (state.queue_size === 0) return null;
            state.queue_size--;
            return state.queues
                .get(getAutoPriority())
                .pop();
        },
        peek: () => {
            if (state.queue_size === 0) return null;
            return state.queues
                .get(getAutoPriority()) || null;
        },
    }
};