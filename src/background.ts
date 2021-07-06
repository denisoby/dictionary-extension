console.log('BACKGROUND SCRIPT: Hello World')


const word = document.querySelector('')

chrome.tabs.getCurrent(tab => {
    alert(tab.title);
    find('Wikipedia', 'Pediwikia', document.body)

});