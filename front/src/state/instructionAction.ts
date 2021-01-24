enum InstructionAction {
    open = 'OPEN_INSTRUCTION',
    close = 'CLOSE_INSTRUCTION'
}

const instructionReducer = (state: any, action: any) => {
    switch (action.type) {
        case InstructionAction.open:
            return { opened: true };
        case InstructionAction.close:
            return { opened: false };
        default:
            throw new Error();
    }
}

export { instructionReducer, InstructionAction };
