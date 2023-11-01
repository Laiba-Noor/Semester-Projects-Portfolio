var barsCount = 180;
var heights = [];

var sorted = false;

function makeBars() {
    for (let i = 1; i <= barsCount / 2; i++) {
        $("#sort-container").append("<div class='bar'></div>");
    }
}

makeBars();
var bars = $(".bar");

setRandomBars();

function setRandomBars() {
    heights = [];
    for (let i = 1; i <= barsCount / 2; i++) {
        heights.push(i * 3);
    }

    //Shuffle the bars
    async function shuffle(heights) {
        var currentIndex = heights.length,
        temporaryValue,
        randomIndex;
   
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
   
        // And swap it with the current element.
        temporaryValue = heights[currentIndex];
        heights[currentIndex] = heights[randomIndex];
        heights[randomIndex] = temporaryValue;
        $(bars[currentIndex]).height(heights[currentIndex]);
        $(bars[randomIndex]).height(heights[randomIndex]);
        await timer(1);
        }
   
        for (let i = 0; i < bars.length; i++) {
            $(bars[i]).height(heights[i]);
        }
        return heights;
    }

    shuffle(heights);
}


function timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

function swap(heights, first_Index, second_Index) {
  var temp = heights[first_Index];
  heights[first_Index] = heights[second_Index];
  heights[second_Index] = temp;
}
//bucket sort

// BUBBLE SORT
async function bubbleSort(heights){
    var len = heights.length;
    for (var i = len-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        if(ahead == false)
            return;
        if(heights[j-1]>heights[j]){
            var temp = heights[j-1];
            heights[j-1] = heights[j];
            heights[j] = temp;
            $(bars[j]).height(heights[j]);
            $(bars[j-1]).height(heights[j-1]);
            await timer(1);
         }
      }
    }
    return heights;
}

// QUICKSORT
async function quickSort(heights, left, right) {
  var index;
  if (heights.length > 1) {
    var pivot = heights[Math.floor((right + left) / 2)], //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
        if(ahead == false)
            return;
      while (heights[i] < pivot) {
        if(ahead == false)
        return;
        i++;
      }
      while (heights[j] > pivot) {
        if(ahead == false)
        return;
        j--;
      }
      if (i <= j) {
        swap(heights, i, j); //sawpping two elements
        $(bars[i]).height(heights[i]);
        $(bars[j]).height(heights[j]);
        await timer(50);
        i++;
        j--;
      }
    }

    index = i;

    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(heights, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(heights, index, right);
    }
  }
  return heights;
}

// SELECTION SORT
async function selectionSort(heights){
    var minIdx, temp,
        len = heights.length;
    for(var i = 0; i < len; i++){
      minIdx = i;
      for(var  j = i+1; j<len; j++){
        if(ahead == false)
            return;
         if(heights[j]<heights[minIdx]){
            minIdx = j;
         }
      }
      temp = heights[i];
      heights[i] = heights[minIdx];
      heights[minIdx] = temp;
      $(bars[i]).height(heights[i]);
      $(bars[minIdx]).height(heights[minIdx]);
      await timer(50);
    }
    return heights;
}

// INSERTION SORT
async function insertionSort(heights){
    var i, len = heights.length, el, j;
 
    for(i = 1; i<len; i++){
      el = heights[i];
      j = i;
 
      while(j>0 && heights[j-1]>el) {
        if(ahead == false)
            return;
        heights[j] = heights[j-1];
        $(bars[j]).height(heights[j]);
        await timer(1);
        j--;
     }
 
     heights[j] = el;
     $(bars[j]).height(heights[j]);
     await timer(1);
    }
 
    return heights;
}  

// RADIX LSD SORT
 async function radixSortLSD(heights) {
    var counter = [
        []
      ];
    var max = 0,
      mod = 10,
      dev = 1; //max
    for (var i = 0; i < heights.length; i++) {
        if(ahead == false)
            return;
      if (heights[i] > max) {
        max = heights[i];
      }
    }
    // determine the large item length
    var maxDigitLength = (max + '').length;
    for (var i = 0; i < maxDigitLength; i++, dev *= 10, mod *= 10) {
      for (var j = 0; j < heights.length; j++) {
        if(ahead == false)
            return;
        var bucket = Math.floor((heights[j] % mod) / dev); // Formula to get the significant digit
        if (counter[bucket] == undefined) {
          counter[bucket] = [];
        }
        counter[bucket].push(heights[j]);
      }
      var pos = 0;
      for (var j = 0; j < counter.length; j++) {
        var value = undefined;
        if (counter[j] != undefined) {
          while ((value = counter[j].shift()) != undefined) {
            if(ahead == false)
                return;
            heights[pos++] = value;
            //console.log(heights[pos - 1]);
            $(bars[pos - 1]).height(heights[pos - 1]);
            await timer(8);
          }
        }
      }
    }
}


// COUNTING SORT
async function countingSort(heights, min, max)
{
  var i, z = 0, count = [];

  for (i = min; i <= max; i++) {
      count[i] = 0;
  }

  for (i=0; i < heights.length; i++) {
      count[heights[i]]++;
  }

  for (i = min; i <= max; i++) {
      while (count[i]-- > 0) {
        if(ahead == false)
            return;
          heights[z++] = i;
          $(bars[z - 1]).height(heights[z - 1]);
          await timer(10);
      }
  }
return heights;
}



// MERGE SORT
async function mergeSort(heights)
{
   var n = heights.length;
   for (curr_size=1; curr_size<=n-1; curr_size = 2*curr_size)
   {
       // Pick starting point of different subarrays of current size
       for (left_start=0; left_start<n-1; left_start += 2*curr_size)
       {
           // Find ending point of left subarray. mid+1 is starting  
           // point of right
           var a = left_start + curr_size - 1;
           var b = n-1;
           var mid = a < b ? a : b;
           //var mid = min(left_start + curr_size - 1, n-1);
            a = left_start + 2*curr_size - 1;
            b = n-1;
            var right_end = a < b ? a : b;
           //var right_end = min(left_start + 2*curr_size - 1, n-1);

           var l = left_start;
           var m = mid;
           var r = right_end;
           var i, j, k;
            var n1 = m - l + 1;
            var n2 =  r - m;
         
            /* create temp arrays */
            var L = new Array(n1);
            var R = new Array(n2);
         
            /* Copy data to temp arrays L[] and R[] */
            for (i = 0; i < n1; i++)
                L[i] = heights[l + i];
            for (j = 0; j < n2; j++)
                R[j] = heights[m + 1+ j];
         
            /* Merge the temp arrays back into heights[l..r]*/
            i = 0;
            j = 0;
            k = l;
            while (i < n1 && j < n2)
            {
                if(ahead == false)
                    return;
                if (L[i] <= R[j])
                {
                    heights[k] = L[i];
                    $(bars[k]).height(heights[k]);
                    await timer(1);
                    i++;
                }
                else
                {
                    heights[k] = R[j];
                    $(bars[k]).height(heights[k]);
                    await timer(1);
                    j++;
                }
                k++;
            }
         
            /* Copy the remaining elements of L[], if there are any */
            while (i < n1)
            {
                if(ahead == false)
                    return;
                heights[k] = L[i];
                $(bars[k]).height(heights[k]);
                await timer(1);
                i++;
                k++;
            }
         
            /* Copy the remaining elements of R[], if there are any */
            while (j < n2)
            {
                if(ahead == false)
                    return;
                heights[k] = R[j];
                $(bars[k]).height(heights[k]);
                await timer(1);
                j++;
                k++;
            }
       }
   }
}


async function InsertionSort(clsnam, delay = 600) {
    let blocks = document.getElementsByClassName(clsnam);
    blocks[0].style.backgroundColor = "rgb(49, 226, 13)";

    for (var i = 1; i < blocks.length; i += 1) {
        var j = i - 1;

        // To store the integer value of ith block to key
        var key = parseInt(blocks[i].childNodes[0].innerHTML);

        // To store the ith block height to height
        var height = blocks[i].style.height;

        // Provide darkblue color to the ith block
        blocks[i].style.backgroundColor = "darkblue";

        // To pause the execution of code for 600 milliseconds
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 600)
        );

        // For placing selected element at its correct position
        while (j >= 0 && parseInt(blocks[j].childNodes[0].innerHTML) > key) {

            // Provide darkblue color to the jth block
            blocks[j].style.backgroundColor = "darkblue";

            // For placing jth element over (j+1)th element
            blocks[j + 1].style.height = blocks[j].style.height;
            blocks[j + 1].childNodes[0].innerText =
                blocks[j].childNodes[0].innerText;
            j = j - 1;

            // To pause the execution of code for 600 milliseconds
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            // Provide lightgreen color to the sorted part
            for (var k = i; k >= 0; k--) {
                blocks[k].style.backgroundColor = " rgb(49, 226, 13)";
            }
        }

        // Placing the selected element to its correct position
        blocks[j + 1].style.height = height;
        blocks[j + 1].childNodes[0].innerHTML = key;

        // To pause the execution of code for 600 milliseconds
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        // Provide light green color to the ith block
        blocks[i].style.backgroundColor = " rgb(49, 226, 13)";
    }
}










//mergesort(heights);
//console.log(heights);

var ahead = false;

$("#init").click(function(e) {
    e.preventDefault();
    if(sorted)
        return;
    sorted = true;
    ahead = true;
    var option = $("#list").val();
    if(option == "bubble") {
        bubbleSort(heights);

    } else if(option == "insertion") {
        insertionSort(heights);
    } else if(option == "selection") {
        selectionSort(heights, 0, heights.length - 1);
    } else if(option == "quick") {
        quickSort(heights, 0, heights.length - 1);
    } else if(option == "radix") {
        radixSortLSD(heights);
    } else if(option == "count") {
        countingSort(heights, 0, 400);
    } else if(option == "merge") {
        mergeSort(heights);
    }

   
    //console.log(heights);
});

$("#shuffle").click(function(e) {
    e.preventDefault();
    ahead = false;
    setRandomBars();
    sorted = false;
});