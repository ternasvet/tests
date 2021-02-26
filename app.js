/*
 *  1. В массиве, содержащем 3 или более чисел, определить подходит ли каждая группа из трех чисел условию a > b < c или
 *  a < b > c. Оформить решение в виде функции которая принимает исходный массив и возвращает массив с результатом
 *  проверки каждой группы, где 1 удовлетворяет условию и 0 - нет.
 *
 * Например: Исходный массив:
 *  [1, 3, 5, 4, 5, 7]
 *  1, 3, 5 => 1 < 3 < 5 - нет 3, 5, 4 => 3 < 5 > 4 - да 5, 4, 5 => 5 > 4 < 5 - да
 *  4, 5, 7 => 4 < 5 < 7 - нет Результат:
 *  [0, 1, 1, 0]
 */


function task1(data) {
    let newArray = [];

    for (let i = 0; i < data.length - 2; i++) {
        let a = data[i];
        let b = data[i + 1];
        let c = data[i + 2];
        if ((a > b && b < c) || (a < b && b > c)) {
            newArray.push(1);
        } else {
            newArray.push(0);
        }
    }
    return newArray;
}

const array1 = [1, 3, 5, 4, 5, 7];

console.log('Result_1:');
console.log(task1(array1));

/*
 *  2. Дана матрица из целых чисел от 1 до 9, размером 3 * N, где N может быть больше либо равна 3.
 *  Необходимо определить содержит ли каждый участок матрицы 3 * 3 все числа от 1 до 9.
 *
 * Например:
 *      Входные данные:
 *   [
 *       [ 1, 2, 3, 2, 7 ], [ 4, 5, 6, 8, 1 ], [ 7, 8, 9, 4, 5 ],
 *   ];
 *  1 участок
 *  123 456 789
 *  содержит все цифры от 1`  до 9
 *  2 участок
 *  232 568 894
 *  не содержит все цифры от 1 до 9
 *  3 участок
 *  327 681 945
 *  содержит все цифры от 1 до 9 Результат [true, false, true]
 */

const task2 = (data) => {
    let result = [];
    let N = data[0].length - 2;
    for (let k = 0; k < N; k++) {
        let tmp = [];
        for (let i = 0; i < 3; i++) {
            for (let j = k; j < k + 3; j++) {
                tmp.push(data[i][j])
            }
        }
        let uniqueNum = tmp.filter((v, i, a) => a.indexOf(v) === i).length === 9;
        result.push(uniqueNum);
    }
    return result;
}

const array2 = [
    [1, 2, 3, 2, 7, 5], [4, 5, 6, 8, 1, 6], [7, 8, 9, 4, 5, 7]
];

console.log('Result_2:');
console.log(task2(array2));


/* 3. Есть набор строк (строка это массив из слов), условия форматирования каждой этой строки и лимит символов в строке.
 *  Необходимо подготовить текст к публикации, так чтобы он удовлетворять условиям форматирования и не превышать
 *  количество символов в строке. Текст должен быть заключен символ * со всех сторон.
 *
 *  Например:
 *  Набор строк, представлен в виде массива, где его элемент это массив
 *  слов строки
 *   [
 *  ["Hello", "world"],
 *     ["Brad", "came", "to", "dinner", "with", "us"], ["He", "loves", "tacos"]
 *   *];
 *  Условия форматирования, где LEFT указывает что текст нужно
 *  выровнять по левой стороне, а RIGHT по правой: ["LEFT", "RIGHT", "LEFT"]
 *  Лимит символов в строке, целое положительное число: 16
 *  1я исходная строка удовлетворяет условию лимита строки "Hello world" (11 chars < 16). Учитывая правило
 *  форматирования для 1й строки LEFT, результат будет:
 *      *Hello world *
 *  2я исходная строка не влазит в лимит "Brad came to dinner with us" (27 chars > 16), значит разбиваем на строки и
 *  применяем правило форматирования RIGHT для всех этих строк. Итого получаем строки
 *  ● Brad came to*
 *  ● dinner with us*
 *  3я строка получается
 *  *He loves tacos *
 *  Итого на выходе должен быть такой результат:
 *   [
 *       "**",
 *       "Hello world *", " Brad came to*", "* dinner with us*", "He loves tacos *", "*" ]*/


const task3 = (data, rules) => {
    let result = [];

    const makeString = (arr, rule) => {
        let str = arr.join(' ');
        let w = '';
        let sp = 16 - str.length;
        if (rule === 'RIGHT') {
            for (let i = 0; i < sp; i++) {
                w += ' ';
            }
            w += str;
        } else {
            w += str;
            for (let i = 0; i < sp; i++) {
                w += ' ';
            }
        }
        return w;
    }
    const splitByLines = (t) => {
        // получившаяся строка меньше граничной длины и разбивать ее на несколько не надо
        // поэтому просто вернем ее
        if (t.join(' ').length < 16) {
            return [
                t
            ];
        }

        let lines = [];
        let line = [];
        let remChar = 16;
        for (let i = 0; i < t.length; i++) {
            // формлула оставшееся место - пробел - длина слова
            remChar = remChar - 1 - t[i].length;
            if (remChar < 0) {
                remChar = 16;
                lines.push(line);
                line = [];
            }
            line.push(t[i]);

            if (i === t.length - 1) {
                lines.push(line);
            }
        }
        return lines;
    }

    data.forEach((v, k) => {
        let lines = splitByLines(v);
        let rule = rules[k];

        lines.forEach((l, i) => {
            let string = makeString(l, rule);

            /* Из задания не совсем ясно какой результат должен быть с расположением звездочек. Если "Текст должен быть
              заключен символ * со всех сторон.", то будет такой вариант. Если смотреть результат на выходе массив :
              ["**", "Hello world *", " Brad came to*", "* dinner with us*", "He loves tacos *", "*"], то могут быть вариации.
              Если варианты не подходят - исправлю*/

            string = '*' + string + '*';

            /*if (i === 0) {
                if (rule === 'LEFT') {
                    string = '*' + string;
                } else {
                    string = string + '*';
                }
            }
            if (i === lines.length - 1) {
                if (rule === 'LEFT' || rule === 'RIGHT') {
                    string = string + '*';
                }
            }*/

            result.push(string);
            console.log(string);
        });
    });
    return result;
}

let array3 = [
    ["Hello", "world"],
    ["Brad", "came", "to", "dinner", "with", "us"],
    ["He", "loves", "tacos"]
];

let alignmentArr = ["LEFT", "RIGHT", "LEFT"];

console.log('Result_3:');
console.log(task3(array3, alignmentArr));
