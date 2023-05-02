/**
 * @param arr finite sequence of numbers
 * @returns The sequence of partial sums of a finite sequence.
 * For example, [3,5,2,1] returns [0,3,8,10,11].
 */
export function partial_sums(arr: number[]): number[] {
    return arr.reduce(
        (list, num) => [...list, list.at(-1) + num],
        [0]
    );
}
