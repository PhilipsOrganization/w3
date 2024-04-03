
/**
 * Svelte Action to add a multiplier class to a node
 * @param node 
 * @param value 
 * @returns 
 */
export function setMultiplier(node: HTMLElement, value: number) {
    node.classList.add(`multiplier-${value}`, "multiplier");
    return {
        destroy() {
            node.classList.remove(`multiplier-${value}`, "multiplier");
        }
    };
}