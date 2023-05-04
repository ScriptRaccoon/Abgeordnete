/** Computes the sequence of partial sums.
 *  For example, `[3,5,2,1]` returns `[0,3,8,10,11]`.
 *  A sequence of length `n` returns a sequence of length `n+1`.
 * @param sequence finite sequence of numbers
 */
export function partial_sums(sequence: number[]): number[] {
    return sequence.reduce((list, num) => [...list, list.at(-1) + num], [0]);
}
