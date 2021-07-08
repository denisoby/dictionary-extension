if (document.location.href === 'https://en.wikipedia.org/wiki/Pug') {
    console.log('CONTENT SCRIPT: Hello World');

    // find('Pug', 'my love', document.body)


const CHECK_ONLY_SPACES_REGEXP = /^\s*$/
const taggedWordElementClassName = 'tagged-word';

function parsePage(node) {
    let textContent = "";
    const textNodes = {};
    
    
    processNode(node);

    return {
        textContent,
        textNodes
    };

    function processNode(node) {

        if(node.nodeType === 3){
            if(node.data.match(CHECK_ONLY_SPACES_REGEXP)){
                return;
            }
            textNodes[textContent.length] = node;
            textContent += node.data;
            return;
        } 
        
        let childNodes = Array.from(node.childNodes || []);
    
        for(const childNode of childNodes) {
            processNode(childNode)
        }
    }
}

const {textContent, textNodes}  = parsePage(document.body);

console.log("All Text Nodes:", textContent, textNodes);

function searchWord(textNode, nodeOffset, wordOffset, wordLength) {
    
    const taggedWord = textNode.textContent.substr(wordOffset, wordLength); //получаем нужное слово
    const endText = textNode.textContent.slice(wordOffset+wordLength); //все что после нужного слова
    const taggedWordElement = document.createElement("a");

    taggedWordElement.textContent = taggedWord;
    taggedWordElement.className = taggedWordElementClassName; 
    textNode.textContent = textNode.textContent.substr(0, wordOffset);
    textNode.after(taggedWordElement, endText);
    
    textNodes[nodeOffset+textNode.length] = taggedWordElement.childNodes[0];
    textNodes[nodeOffset+textNode.length+taggedWord.length] = taggedWordElement.nextSibling;
}

searchWord(textNodes["290"], 290, 7, 4);
console.log(textNodes["290"])


function createTooltip(textTooltip) {
    const tooltipElement = document.createElement("a");
    tooltipElement.className = 'tooltip';
    tooltipElement.textContent = textTooltip;
    
    return tooltipElement
}

const tooltipElement = createTooltip("temporary text");

document.body.append(tooltipElement);

const style = document.querySelector('style');

function addStyle(styleString) {  
    style.textContent = styleString;
}

document.addEventListener('mouseover', function(event) {
    if(event.target.classList.contains(taggedWordElementClassName)) {
        addStyle(`
            .tooltip{
                position: absolute;
                border : 1px solid #b3c9ce;
                display: block;
            }
        `)
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
}, capture=true);

document.addEventListener('mouseout', function() {
    addStyle(`
        .tooltip{
            display: none;
        }
    `)
  }, capture=true);

}