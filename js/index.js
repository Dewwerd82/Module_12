// элементы в DOM можно получить при помощи функции querySelector
const spisok = document.querySelector('.fruits__wrapper');
const todo = document.querySelector('.todo');
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

let minWeight = 0;
let maxWeight = 0;
let weightInputNum = 0;

// список фруктов в JSON формате
let fruitsJSON = `[ 
{ "kind": "Мангустин", "color": "фиолетовый", "weight": 1300 }, 
{ "kind": "Дуриан", "color": "зеленый", "weight": 35 }, 
{ "kind": "Личи", "color": "розово-красный", "weight": 17 }, 
{ "kind": "Карамбола", "color": "желтый", "weight": 28 }, 
{ "kind": "Тамаринд", "color": "светло-коричневый", "weight": 22 }
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
/*** ОТОБРАЖЕНИЕ ***/

const display_s = () => {

    while (todo.firstChild) {

        todo.removeChild(todo.firstChild);
    }


};

// отрисовка карточек
const display = () => {

    // TODO: очищаем fruitsList от вложенных элементов,
    // чтобы заполнить актуальными данными из fruits
    while (todo.firstChild) {

        todo.removeChild(todo.firstChild);
    }

    for (let i = 0; i < fruits.length; i++) {
        // TODO: формируем новый элемент <li> при помощи document.createElement,
        // и добавляем в конец списка fruitsList при помощи document.appendChild

        var ulfruits__List = document.createElement('ul');
        ulfruits__List.className = "fruits__list";
        todo.appendChild(ulfruits__List);
        var li = document.createElement('li');
        li.className = "fruit__item";
        li.classList.add("fruit_violet");
        ulfruits__List.appendChild(li);
        var divfruits__Info = document.createElement('div');
        divfruits__Info.className = "fruit__info";
        li.appendChild(divfruits__Info);
        //--------------------------------------------------
        var divIndex = document.createElement('div');
        divfruits__Info.appendChild(divIndex);
        var textIndex = document.createTextNode("index  " + i);
        divIndex.appendChild(textIndex);
        //-----------------------------------------
        var divKind = document.createElement('div');
        divfruits__Info.appendChild(divKind);
        var textKind = document.createTextNode(fruits[i].kind);
        divKind.appendChild(textKind);
        //-----------------------------------------
        var divColor = document.createElement('div');
        divfruits__Info.appendChild(divColor);
        var textColor = document.createTextNode(fruits[i].color);
        divColor.appendChild(textColor);
        //-----------------------------------------
        var divWeight = document.createElement('div');
        divfruits__Info.appendChild(divWeight);
        var textWeight = document.createTextNode(fruits[i].weight + "кг");
        divWeight.appendChild(textWeight);


    };

};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {

    let n = fruits.length;
    for (let i = 0; i < n; i++) {

        let r = i + getRandomInt(i, n);
        let temp = fruits[i];
        fruits[i] = fruits[r];
        fruits[r] = temp;

        return;
    };

};
shuffleButton.addEventListener('click', () => {

    shuffleFruits();
    display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
    var newArray = [];
    for (let i = 0; i < fruits.length; i++) {
        if (fruits[i].weight >= minWeight && fruits[i].weight <= maxWeight) {
            newArray.push(fruits[i]);
        }
    }
    fruits = newArray;
    return;
};

filterButton.addEventListener('click', () => {
    minWeight = parseInt(document.querySelector('.minweight__input').value);
    maxWeight = parseInt(document.querySelector('.maxweight__input').value);
    minWeightStr = document.querySelector('.minweight__input').value;
    maxWeightStr = document.querySelector('.maxweight__input').value;
    if (typeof minWeight === 'number' && !isNaN(minWeight) &&
        typeof maxWeight === 'number' && !isNaN(maxWeight) && maxWeight > minWeight &&
        minWeightStr != '' && maxWeightStr != '') {
        maxWeight > 10000 ? maxWeight = 10000 : maxWeight;
        minWeight < 0 ? minWeight = 0 : minWeight;
        filterFruits();
        display();
    } else {
        alert('Некорректо ввели данные!!!');
    }

});




/*** СОРТИРОВКА ***/




let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
    // TODO: допишите функцию сравнения двух элементов по цвету
    return a - b;
};



function swap(items, firstIndex, secondIndex) {
    let temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
    display();
};

function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);

            i++;
            j--;
        }
    }
    return i;
}
const sortAPI = {

    bubbleSort(arr, comparation) {

        // TODO: допишите функцию сортировки пузырьком----------------------------------------------------
        const n = arr.length;

        // внешняя итерация по элементам
        for (let i = 0; i < n - 1; i++) {
            // внутренняя итерация для перестановки элемента в конец массива
            for (let j = 0; j < n - 1 - i; j++) {
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
        return arr;

    },

    quickSort(arr, comparation) {
        // TODO: допишите функцию быстрой сортировки-------------------------------------------------
        var index;
        if (arr.length > 1) {
            left = typeof left != "number" ? 0 : left;
            right = typeof right != "number" ? arr.length - 1 : right;
            index = partition(arr, left, right);

            if (left < index - 1) {

                quickSort(arr, left, index - 1);

            }

            if (index < right) {

                quickSort(arr, index, right);

            }

            return arr;
        }


    },
    startSort(sort, arr, comparation) {
        const start = new Date().getTime();
        sort(arr, comparation);
        const end = new Date().getTime();
        sortTime = `${end - start}ms `;
        sortTimeLabel.textContent = sortTime;
    },
    // выполняет сортировку и производит замер времени

};

// инициализация полей
sortKindLabel.textContent = sortKind;



sortChangeButton.addEventListener('click', () => {
    // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
    sortKind == 'bubbleSort' ? sortKind = 'quickSort' : sortKind = 'bubbleSort';
    sortKindLabel.textContent = sortKind;

});

sortActionButton.addEventListener('click', () => {
    // TODO: вывести в sortTimeLabel значение 'sorting...'

    const sort = sortAPI[sortKind];
    sortAPI.startSort(sort, fruits, comparationColor());

    display();
    // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
    weightInputNum = parseInt(weightInput.value);
    if (typeof weightInputNum === 'number' && !isNaN(weightInputNum) &&
        kindInput.value != '' && colorInput.value != '') {
        var newElement = {};
        newElement['kind'] = kindInput.value;
        newElement['color'] = colorInput.value;
        newElement['weight'] = weightInput.value;
        fruits.push(newElement);
        display();
    } else {
        alert('Некорректо ввели данные!!!');
    }
    // TODO: создание и добавление нового фрукта в массив fruits
    // необходимые значения берем из kindInput, colorInput, weightInput

});