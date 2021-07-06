if (document.location.href === 'https://en.wikipedia.org/wiki/Pug') {
    console.log('CONTENT SCRIPT: Hello World');

    // find('Pug', 'my love', document.body)
}

function find(word: string, translation: string, parentNode: HTMLElement) {
    const nodesArray = Array.prototype.slice.call(parentNode.childNodes);

    for (const node of nodesArray) {
        console.log(node.nodeType);
        if (node.nodeType === Node.TEXT_NODE) {
            // data or textContent or wholeText
            const textContent = node.textContent;
            const maxLength = 100;
            console.log('TEXT: ', textContent.substr(0, maxLength));
            const wordStart = textContent.indexOf(word);
            if (wordStart > -1) {
                const beforeWord = textContent.slice(0, wordStart);
                const afterWord = textContent.slice(wordStart + word.length);

                node.textContent = beforeWord;
                const wordElement = document.createElement('span');
                wordElement.innerText = `${word} (${translation})`;

                const afterWordElement = document.createTextNode(afterWord);
                node.after(wordElement,afterWordElement);

            }
        }
        else {
            console.log('Children of', node);
            find(word, translation, node);
        }
    }
}

