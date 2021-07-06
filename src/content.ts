if (document.location.href === 'https://en.wikipedia.org/wiki/Pug') {
    console.log('CONTENT SCRIPT: Hello World');

    // find('Pug', 'my love', document.body)
}

let allPageText = "";
const textNodes = {};
let tooltipElement

function processNode(node) {
    
    if(node.nodeType === 3){
        if(node.data.match(/^\s*$/)){
            return;
        }
        textNodes[allPageText.length] = node;
        allPageText += node.data;
        return;
    } 
    
    let childNodes = Array.from(node.childNodes || []);

    for(const childNode of childNodes) {
        processNode(childNode)
    }
}

processNode(document.body);
console.log("All Text Nodes:",textNodes);

function searchWord(textNode, startWord, lengthWord, offset) {

    const taggedWord = textNode.textContent.slice(startWord, lengthWord+startWord); //получаем нужное слово
    const endText = textNode.textContent.slice(lengthWord+startWord); //все что после нужного слова
    const taggedWordElement = document.createElement("a");

    taggedWordElement.textContent = taggedWord;
    taggedWordElement.className = 'tagged-word'; 
    textNode.textContent = textNode.textContent.substr(0, startWord);
    textNode.after(taggedWordElement, endText);
    
    textNodes[offset+textNode.length] = taggedWordElement.childNodes[0];
    textNodes[offset+textNode.length+taggedWord.length] = taggedWordElement.nextElementSibling;
}

searchWord(textNodes["448"], 8, 4, 448);
console.log(textNodes["448"])




document.addEventListener('mouseover', function(event) {
    debugger
    if(event.target.className === 'tagged-word') {
        tooltipElement = document.createElement("a");
        tooltipElement.className = 'tooltip';
        tooltipElement.textContent = "text";
        tooltipElement.style.position = 'fixed';
        tooltipElement.style.border = '1px solid #b3c9ce';
        document.body.append(tooltipElement);


        let coords = event.target.getBoundingClientRect();
        let left = coords.left + (event.target.offsetWidth - tooltipElement.offsetWidth) / 2;
          if (left < 0) left = 0; // не заезжать за левый край окна
        let top = coords.top - tooltipElement.offsetHeight - 5;
        if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
            top = coords.top + event.target.offsetHeight + 5;
        }
        tooltipElement.style.left = coords.left + pageXOffset + 'px';
        tooltipElement.style.top = top + 'px';
    }
    
});

document.addEventListener('mouseout', function() {

    if (tooltipElement) {
        tooltipElement.remove();
        tooltipElement = null;
    }

  });