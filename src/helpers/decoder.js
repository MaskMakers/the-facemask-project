// Used to add HTML Entity characters such as non breaking spaces
// &nbsp;
// https://forum.vuejs.org/t/how-to-display-escaped-html-special-characters-the-right-way/33845

export default function decoder (str) {
  var textArea = document.createElement('textarea')
  textArea.innerHTML = str
  return textArea.value
}
