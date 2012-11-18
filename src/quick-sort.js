/**
 * Sorts an array of integers using the QuickSort algorithm.
 * @param {Array.<number>} array Array of items to be sorted.
 * @param {number} [insertionSortSwitchThreshold=16]
 * @param {'standard'|'hoare'} [partitionAlgorithm='standard']
 */
aij.quickSort = function (array, insertionSortSwitchThreshold, partitionAlgorithm) {
    insertionSortSwitchThreshold = insertionSortSwitchThreshold || 16;
    /**
     * Partition the array in-place around a random pivot.
     * @param {Array.<number>} array Reference to the partitioned array.
     * @param {number} left The start index of the partitioned array section.
     * @param {number} right The end index of the partitioned array section.
     */
    var standardPartition = function (array, left, right) {
        var length = right - left;
        if (length <= insertionSortSwitchThreshold) {
            aij.insertionSort(array, left, right);
            return;
        }

        // Get a random pivot and move it to the beginning of the array.
        var pivotIndex = (left + right / 2) << 0,
            pivot = array[pivotIndex],
            temp;

        array[pivotIndex] = array[left];
        array[left] = pivot;

        // Organize the array around the pivot.
        var partitionIndex = left + 1;
        for (var i = left + 1; i < right; i++) {
            if ((temp = array[i]) < pivot) {
                array[i] = array[partitionIndex];
                array[partitionIndex] = temp;
                partitionIndex++;
            }
        }

        // Put the pivot element in its rightful place.
        var pim1 = partitionIndex - 1;
        temp = array[left];
        array[left] = array[pim1];
        array[pim1] = temp;

        // Recursively partition the sub-arrays before and after the pivot.
        standardPartition(array, left, pim1);
        standardPartition(array, partitionIndex, right);
    };

    var HoarePartition = function (array, left, right) {
        var length = right - left;
        if (length <= insertionSortSwitchThreshold) {
            aij.insertionSort(array, left, right);
            return;
        }

        // Get a random pivot and move it to the beginning of the array.
        var pivotIndex = (left + right / 2) << 0,
            pivot = array[pivotIndex],
            high = right - 1,
            rm1 = high,
            low = left,
            temp;

        array[pivotIndex] = array[high];
        array[high] = pivot;

        // Organize the array around the pivot.
        high--;
        while (true) {
            do high--; while (array[high] > pivot);
            do low++; while (array[low] < pivot);
            if (low < high) {
                temp = array[low];
                array[low] = array[high];
                array[high] = temp;
            } else break;
        }

        // Put the pivot element in its rightful place.
        array[rm1] = array[low];
        array[low] = pivot;

        // Recursively partition the sub-arrays before and after the pivot.
        HoarePartition(array, left, high);
        HoarePartition(array, low + 1, right);
    };

    var partition = partitionAlgorithm == 'hoare' ? HoarePartition : standardPartition;

    // Initiate QuickSort on the input array.
    return partition(array, 0, array.length);
};
