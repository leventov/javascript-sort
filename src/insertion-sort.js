/**
 * Sorts an array of integers using the InsertionSort algorithm.
 * @param {Array.<number>} array Array of items to be sorted.
 * @param {number} [left=0]
 * @param {number} [right=array.length]
 */
aij.insertionSort = function (array, left, right) {
    left = left || 0;
    right = right || array.length;

    for (var i = left; i < right; i++) {
        var j = i,
            item = array[j];

        while (j > 0 && array[j - 1] > item) {
            array[j] = array[j - 1];
            j--;
        }

        array[j] = item;
    }

    return array;
};
