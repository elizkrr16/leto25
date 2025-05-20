// Алфавиты 
const enAlphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
                   'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const ruAlphabet = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М',
                   'Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ',
                   'Ъ','Ы','Ь','Э','Ю','Я'];

// Элементы страницы
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encryptBtn = document.getElementById('encryptBtn');
const alphabetInfo = document.getElementById('alphabetInfo');
const processInfo = document.getElementById('processInfo');

// Функция для проверки наличия символа в массиве
function isInArray(char, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === char) return true;
    }
    return false;
}

// Функция для получения индекса символа
function getIndex(char, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === char) return i;
    }
    return -1;
}

// Показываем алфавиты
function showAlphabets() {
    let enAlphabetStr = '';
    let ruAlphabetStr = '';
    
    for (let i = 0; i < enAlphabet.length; i++) {
        enAlphabetStr += enAlphabet[i];
    }
    
    for (let i = 0; i < ruAlphabet.length; i++) {
        ruAlphabetStr += ruAlphabet[i];
    }
    
    alphabetInfo.innerHTML = '';
    alphabetInfo.innerHTML += '<p><strong>Английский алфавит:</strong> ' + enAlphabetStr + '</p>';
    alphabetInfo.innerHTML += '<p><strong>Русский алфавит:</strong> ' + ruAlphabetStr + '</p>';
}

// Шифрование ROT13
function rot13(text) {
    let result = '';
    processInfo.innerHTML = '<h4>Процесс шифрования:</h4>';
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        let upperChar = char;
        let isLower = false;
        let stepInfo = `'${char}' → `;
        
        // Проверяем регистр и находим uppercase вариант
        for (let j = 0; j < enAlphabet.length; j++) {
            if (char === enAlphabet[j].toLowerCase()) {
                upperChar = enAlphabet[j];
                isLower = true;
                break;
            }
        }
        for (let j = 0; j < ruAlphabet.length; j++) {
            if (char === ruAlphabet[j].toLowerCase()) {
                upperChar = ruAlphabet[j];
                isLower = true;
                break;
            }
        }
        
        // Для английских букв
        if (isInArray(upperChar, enAlphabet)) {
            const index = getIndex(upperChar, enAlphabet);
            const newIndex = (index + 13) % 26;
            const newChar = enAlphabet[newIndex];
            result += isLower ? newChar.toLowerCase() : newChar;
            stepInfo += `англ. (${index}+13)%26=${newIndex} → '${isLower ? newChar.toLowerCase() : newChar}'`;
        }
        // Для русских букв
        else if (isInArray(upperChar, ruAlphabet)) {
            const index = getIndex(upperChar, ruAlphabet);
            const newIndex = (index + 13) % 33;
            const newChar = ruAlphabet[newIndex];
            result += isLower ? newChar.toLowerCase() : newChar;
            stepInfo += `рус. (${index}+13)%33=${newIndex} → '${isLower ? newChar.toLowerCase() : newChar}'`;
        }
        // Для других символов
        else {
            result += char;
            stepInfo += `не буква → без изменений`;
        }
        
        processInfo.innerHTML += `<div>${stepInfo}</div>`;
    }
    
    return result;
}

// Инициализация
showAlphabets();

// Обработчик кнопки
encryptBtn.addEventListener('click', function() {
    let text = '';
    const textarea = inputText;
    for (let i = 0; i < textarea.value.length; i++) {
        text += textarea.value[i];
    }
    outputText.textContent = rot13(text);
});