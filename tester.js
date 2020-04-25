var item_array = ['hello', 'from', 'the', 'other', 'side'];

function deleteItem(value) {
    item_array.splice(item_array[item_array.indexOf(value)], 1);
}

deleteItem('hello');