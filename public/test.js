// function find(word, translation, parentNode) {
//     for (let node of parentNode.childNodes) {
//         console.log(node.nodeType);
//         if (node.nodeType === Node.TEXT_NODE) {
//             // data or textContent or wholeText
//             let textContent = node.textContent;
//             console.log("TEXT: ", textContent.substr(0, 100));
//             let wordStart = textContent.indexOf(word);
//             if (wordStart > -1) {
//                 const beforeWord = textContent.slice(0, wordStart);
//                 const afterWord = textContent.slice(wordStart + word.length);
//
//                 node.textContent = beforeWord;
//                 const wordElement = document.createElement("div");
//                 wordElement.innerText = `${word} (${translation})`;
//
//                 const afterWordElement = document.createTextNode(afterWord);
//                 node.after(wordElement,afterWordElement);
//
//             }
//         }
//         else {
//             console.log("Children of", node);
//             find(word, translation, node);
//         }
//     }
// }
//
// chrome.tabs.getCurrent(function(tab) {
//     alert(tab.title);
//     find("Wikipedia", "Pediwikia", document.body)
//
// });

// find("Wikipedia", "Pediwikia", document.body)
